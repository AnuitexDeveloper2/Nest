import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "src/entities/author.entity";
import { AuthorInBook } from "src/entities/authorInBook.entity";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { MyLogger } from "src/shared/logger/logger";
import { Repository } from "typeorm";


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity) private readonly repository: Repository<BookEntity>,
        @InjectRepository(AuthorInBook) private readonly authorInBookRepository: Repository<AuthorInBook>,
        @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
        private readonly logger: MyLogger
    ) { }
    async createBooks(book: BookEntity) {
        this.logger.log(`createBooks() with params ${JSON.stringify(book)}`)
        const bookSave = await this.repository.save(book)
        if (!bookSave) {
            return false
        }
        const authors = await book.authors;
        for (let i = 0; i < authors.length; i++) {
            const test = new AuthorInBook();
            const authorInBook: AuthorInBook = { ...test, authorId: authors[i].id, bookId: bookSave.id }
            const result = this.authorInBookRepository.save(authorInBook)
        }

        return true
    }

    async GetBooks(filter: BaseFilter): Promise<BookEntity[]> {
        this.logger.log(`GetBooks() with params = ${JSON.stringify(filter)}`)
        const take = filter.pageSize;
        const skip = (filter.pageNumber - 1) * filter.pageSize;
        const result = await this.repository.query(
            `select b.title, b.description, b.category, b.price, b.id, ab.authorid from book as b left join authorinbook as ab on ab.bookid = b.id where removed_at = 0 order by id LIMIT ${take} OFFSET ${skip}`
            )
        const books = Array<BookEntity>()
        let currentId = result[0].id
        let author;
        let authors = new Array<AuthorEntity>()
        let book = new BookEntity()
        let currentBook = new BookEntity();
        for (let i = 0; i < result.length; i++) {
            if (currentId !== result[i].id) {
                authors = new Array<AuthorEntity>()
                book = currentBook
                books.push(currentBook)
                currentId = result[i].id
            }
            if (result[i].authorid) {
                author = await this.authorRepository.findOne({ id: result[i].authorid })
                authors.push(author)
            }
            currentBook = {
                id: result[i].id,
                title: result[i].title,
                authors: authors,
                removed_at: result[i].removed_at,
                description: result[i].description,
                price: result[i].price,
                category: result[i].category,
                cover_image: result[i].cover_image,
                currency: result[i].currency
            }
            if (i === result.length -1) {
                books.push(currentBook)
            }
        }
        return books;
    }

    async Remove(id: number): Promise<boolean> {
        const book = await this.repository.findOne(id)
        if (!book) {
            return false
        }
        const result = await this.repository.query(`UPDATE book SET removed_at = 1 where id=${id}`)
        if (!result.changedRows) {
            return false
        }
        return true
    }
}