import { Currency } from "src/shared/enums";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { AuthorInBook } from "./authorInBook.entity";
import { BaseEntity } from "./base";

@Entity('Book')
export class BookEntity extends BaseEntity {

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    cover_image: string;

    @Column()
    price: number;

    @Column({default: Currency.USD})
    currency: Currency

    @OneToMany(()=> AuthorInBook, b=> b.bookId)
    authors: Promise<AuthorEntity[]>

}