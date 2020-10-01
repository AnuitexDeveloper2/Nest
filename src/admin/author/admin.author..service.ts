import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "src/entities/author.entity";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { MyLogger } from "src/shared/logger/logger";
import { QueryBuilder, Repository, SelectQueryBuilder } from "typeorm";

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
        const result = await this.repository.query(`select author.id, author.name, authorinbook.bookId from author left join authorinbook on author.id = authorinbook.authorId where author.id = author.id order by id`);
        const authors = Array<AuthorEntity>()
        let currentId = result[0].id
        let book;
        let books = new Array<BookEntity>()
        let author = new AuthorEntity()
        let currentAuthor = new AuthorEntity();
        for (let i = 0; i < result.length; i++) {
            if (currentId !== result[i].id) {
                books = new Array<BookEntity>()
                author = currentAuthor
                authors.push(author)
                currentId = result[i].id
            }
            if (result[i].bookId) {
                try {
                    
                    book = await this.bookRepository.findOne({ id: result[i].bookId })
                } catch (error) {
                    console.log(error)
                }
                books.push(book)
            }
            currentAuthor = {
                id: result[i].id,
                name: result[i].name,
                books: books,
                removed_at: result[i].removed_at
            }
        }
        return authors;
    }
    
    async getAllAuthors(): Promise<AuthorEntity[]> {
        const result = await this.repository.query('SELECT * FROM author')
        return result
    }
}