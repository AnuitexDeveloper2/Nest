import { Currency } from "src/shared/enums";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./base";
import { BookEntity } from "./book.entity";
import { OrderEntity } from "./order.entity";

@Entity('OrderItem')
export class OrderItemEntity extends BaseEntity {

    @Column()
    price: number

    @Column()
    count: number

    @Column({default: Currency.USD})
    currency: Currency

    @ManyToOne(type => BookEntity)
    @JoinColumn()
    book: BookEntity

    @ManyToOne(type => OrderEntity)
    order: OrderEntity

    bookIds: number

}