import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "src/entities/author.entity";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
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
            .leftJoinAndSelect("author.books", "book").take(take).skip(skip).getMany()
        // let authors = this.repository.find({ relations: ['books'],skip:skip,take:take })
        const count = await this.repository.count()
        return { data: authors, count: count };
    }

    async getAllAuthors(): Promise<AuthorEntity[]> {
        const result = await this.repository.query('SELECT * FROM author')
        return result
    }
}