import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/entities/book.entity";
import { OrderEntity } from "src/entities/order.entity";
import { OrderItemEntity } from "src/entities/orderItem.entity";
import { UserEntity } from "src/entities/user.entity";
import { OrderStatusType } from "src/shared/enums";
import { MyLogger } from "src/shared/logger/logger";
import { Repository } from "typeorm";

@Injectable()
export class UserOrderService {
    constructor(
        @InjectRepository(OrderItemEntity) private readonly repository: Repository<OrderItemEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
        private readonly Logger: MyLogger
    ) { }

    async CreateOrder(order: OrderEntity): Promise<boolean> {
        this.Logger.log(`CreateOrder with params = ${JSON.stringify(order)}`)
        const user = await this.userRepository.findOne({ id: order.userId })
        order.user = user;
        if (order.transactionId) {
            order.status = OrderStatusType.Paid
        }
        order.createdDate = new Date()
        const savedOrder = await this.orderRepository.save(order)
        if (!savedOrder) {
            return false
        }
        
        order.orderItem.map(async (item: OrderItemEntity) => {
            const book = await this.bookRepository.findOne({ id: item.bookIds })
            item.book = book
            item.order = savedOrder
            item.createdDate = new Date()
            try {

                const result = await this.repository.save(item)
                if (!result) {
                    return false
                }
            } catch (error) {
                if (error) {
                    
                    console.log(error)
                }
            }
        })
        return true
    }

    async GetUserOrders(userId: number) {
        let order;
        const user = await this.userRepository.findOne({ id: userId })
        order = await this.orderRepository
            .createQueryBuilder('order')
            .innerJoinAndSelect(`order.user`,'user',`user.id = ${userId}`)
            .leftJoinAndSelect(`order.orderItem`, `orderitem`)
            .leftJoinAndSelect('orderitem.book', 'book')
            .getMany()
        return order
    }
}