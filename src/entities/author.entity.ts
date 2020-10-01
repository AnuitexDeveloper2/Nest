import { Column, Entity, OneToMany } from "typeorm";
import { AuthorInBook } from "./authorInBook.entity";
import { BaseEntity } from "./base";
import { BookEntity } from "./book.entity";

@Entity('Author')
export class AuthorEntity extends BaseEntity{
    
    @Column()
    name: string

    @OneToMany(() => AuthorInBook, a => a.authorId)
    books: BookEntity[]

}