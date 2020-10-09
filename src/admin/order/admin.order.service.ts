import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/entities/order.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { ResponseData } from "src/interfaces/filters/responceData";
import { MyLogger } from "src/shared/logger/logger";
import { Repository } from "typeorm";

@Injectable()
export class AdminOrderService {
    constructor(
        @InjectRepository(OrderEntity) private readonly repository: Repository<OrderEntity>,
        private readonly logger: MyLogger
        ) { }

    async GetOrders(filter: BaseFilter) {
        this.logger.log(`GetOrder with params = ${JSON.stringify(filter)}`)
        const skip = (filter.pageNumber - 1) * filter.pageSize
        const order = await this.repository
            .createQueryBuilder('order')
            .innerJoinAndSelect(`order.user`, 'user')
            .leftJoinAndSelect(`order.orderItem`, `orderitem`)
            .leftJoinAndSelect('orderitem.book', 'book').limit(filter.pageSize).offset(skip)
            .getManyAndCount()

        const result : ResponseData<OrderEntity> = {
            data: order[0],
            count: order[1]
        }
        return result
    }
}