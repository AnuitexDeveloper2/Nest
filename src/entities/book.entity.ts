import { Category, Currency } from "src/shared/enums";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { BaseEntity } from "./base";
import { OrderItemEntity } from "./orderItem.entity";

@Entity('Book')
export class BookEntity extends BaseEntity{

    @Column()
    title: string

    @Column('text')
    description: string
    
    @Column('double')
    price: number

    @Column({default: Category.Book})
    category: Category

    @Column('text')
    cover_image: string

    @Column({default: Currency.USD})
    currency: Currency

    @ManyToMany(type => AuthorEntity, author => author.books,{cascade:true})
    @JoinTable()
    authors: AuthorEntity[]
}