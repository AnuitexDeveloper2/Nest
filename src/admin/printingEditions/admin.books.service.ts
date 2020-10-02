import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "src/entities/author.entity";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { MyLogger } from "src/shared/logger/logger";
import { Repository } from "typeorm";


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity) private readonly repository: Repository<BookEntity>,
        @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
        private readonly logger: MyLogger
    ) { }
    async createBooks(book: BookEntity) {
        this.logger.log(`createBooks() with params ${JSON.stringify(book)}`)
        let authorsId = new Array<number>()
        for (let i = 0; i < book.authors.length; i++) {
            authorsId.push(book.authors[i].id)
        }
        const authors = await this.authorRepository.findByIds(authorsId)
        book.authors = authors
        const bookSave = await this.repository.save(book)
        if (!bookSave) {
            return false
        }

        return true
    }

    async GetBooks(filter: BaseFilter): Promise<BookEntity[]> {
        this.logger.log(`GetBooks() with params = ${JSON.stringify(filter)}`)
        const take = filter.pageSize;
        const skip = (filter.pageNumber - 1) * filter.pageSize;
        const books = this.repository.find({ relations: ['authors'] })
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