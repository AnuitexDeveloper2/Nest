import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { BookEntity } from "./book.entity";

@Entity('AuthorInBook')
export class AuthorInBook {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    authorId: number

    @PrimaryColumn()
    bookId: number

    @ManyToOne(() => AuthorEntity, author => author.books)
    @JoinColumn({name:'authorId'})
    authors: Promise<AuthorEntity>

    @ManyToOne(() => BookEntity, author => author.authors)
    @JoinColumn({name:'bookId'})
    books: Promise<BookEntity>
}