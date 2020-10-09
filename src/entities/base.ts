import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: false})
    removed_at: boolean

    @Column('date')
    createdDate?: Date 
}