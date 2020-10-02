import { type } from "os";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base";
import { BookEntity } from "./book.entity";

@Entity('Author')
export class AuthorEntity extends BaseEntity {

    @Column()
    name: string

    @ManyToMany(type => BookEntity, book => book.authors)
    books: BookEntity[]
}