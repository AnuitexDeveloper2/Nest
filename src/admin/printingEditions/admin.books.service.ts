import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "src/entities/author.entity";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { ResponseData } from "src/interfaces/filters/responceData";
import { MyLogger } from "src/shared/logger/logger";
import { Like, Repository } from "typeorm";


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
        book.createdDate = new Date()
        try {

            const bookSave = await this.repository.save(book)
            if (!bookSave) {
                return false
            }
        } catch (error) {

        }

        return true
    }

    async GetBooks(filter: BaseFilter): Promise<ResponseData<BookEntity>> {
        this.logger.log(`GetBooks() with params = ${JSON.stringify(filter)}`)
        const take = filter.pageSize;
        const skip = (filter.pageNumber - 1) * filter.pageSize;
        const search = filter.searchString ? { 'title': Like(`%${filter.searchString}%`) } : ''

        const books = await this.repository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.authors', 'author', 'author.removed_at = 0')
            .where(search)
            .andWhere('book.removed_at = 0')
            .take(take)
            .skip(skip)
            .getManyAndCount()

        const result: ResponseData<BookEntity> = {
            data: books[0],
            count: books[1]
        }
        return result;
    }

    async Remove(id: number): Promise<boolean> {
        this.logger.log(`RemoveBooks() with id = ${id}`)
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

    async Update(bookParam: BookEntity): Promise<boolean> {
        this.logger.log(`UpdateBook() with params = ${JSON.stringify(bookParam)}`)
        const authors = new Array<AuthorEntity>()
        for (let i = 0; i < bookParam.authors.length; i++) {
            const author = await this.authorRepository.findOne({ id: bookParam.authors[i].id })
            if (author) {
                authors.push(author)
            }
        }
        bookParam.authors = authors
        try {
            const book = await this.repository.save(bookParam)
        } catch (error) {
        }
        return true
    }
}