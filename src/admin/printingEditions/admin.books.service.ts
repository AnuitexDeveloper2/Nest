import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

    async GetBooks(filter: BaseFilter) {
        this.logger.log(`GetBooks() with params = ${JSON.stringify(filter)}`)
        const result = await this.repository.query('select a.title, a.id, ab.authorid from book as a left join authorinbook as ab on ab.bookid = a.id order by id')
        console.log(result)
        return result
    }
}