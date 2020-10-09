import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "src/entities/author.entity";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { ResponseData } from "src/interfaces/filters/responceData";
import { MyLogger } from "src/shared/logger/logger";
import { getRepository, QueryBuilder, Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(AuthorEntity) private readonly repository: Repository<AuthorEntity>,
        @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
        private readonly logger: MyLogger,
    ) { }

    async create(author: AuthorEntity) {
        this.logger.log(`createAuthor with params ${JSON.stringify(author)}`)
        author.createdDate = new Date()
        const result = await this.repository.save(author);
        if (!result) {
            return false;
        }
        return true;
    }

    async getAuthors(filter: BaseFilter) {
        this.logger.log(`getAuthors with params ${JSON.stringify(filter)}`)
        const take = filter.pageSize;
        const skip = (filter.pageNumber - 1) * filter.pageSize;

        const authors = await this.repository.createQueryBuilder("author")
            .leftJoinAndSelect("author.books", "book", "book.removed_at = 0").where('author.removed_at = 0').take(take).skip(skip).getManyAndCount()
        // let authors = this.repository.find({ relations: ['books'],skip:skip,take:take })
        const result: ResponseData<AuthorEntity> = {
            data: authors[0],
            count: authors[1]
        }
        return result
    }

    async getAllAuthors(): Promise<AuthorEntity[]> {
        const result = await this.repository.query('SELECT * FROM author WHERE removed_at = 0')
        return result
    }

    async Update(author: AuthorEntity): Promise<AuthorEntity> {
        this.logger.log(`UpdateAuthor() with params = ${JSON.stringify(author)}`)
        const bookIds = await this.bookRepository.query(`SELECT b.id from book as b left join book_authors__author as ab on ab.bookID = b.id left join author as a on ab.authorid = a.id where a.id = ${author.id}`)
        const books = await this.bookRepository.findByIds(bookIds)
        author.books = books
        const result = await this.repository.save(author)
        return result
    }

    async Remove(id: number): Promise<boolean> {
        this.logger.log(`RmoveAuthor() with id = ${JSON.stringify(id)}`)
        const author = await this.repository.findOne(id)
        author.removed_at = true;
        const result = await this.repository.save(author)
        if (!result) {
            return false
        }
        return true
    }
}