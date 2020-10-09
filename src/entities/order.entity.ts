import { OrderStatusType } from "src/shared/enums";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base";
import { OrderItemEntity } from "./orderItem.entity";
import { UserEntity } from "./user.entity";

@Entity('Order')
export class OrderEntity extends BaseEntity {

    @Column({default: OrderStatusType.Unpaid})
    status: OrderStatusType

    @Column()
    amount: number

    @Column()
    transactionId: string

    @ManyToOne(type => UserEntity)
    user: UserEntity 

    @OneToMany(type => OrderItemEntity, orderItemEntity => orderItemEntity.order)
    orderItem: OrderItemEntity[]

    userId: number
}