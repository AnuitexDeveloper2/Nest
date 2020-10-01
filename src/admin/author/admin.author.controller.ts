import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "src/account/authentication/authGuard";
import { AuthorEntity } from "src/entities/author.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { AuthorService } from "./admin.author..service";

@Controller('admin/author')
export class AuthorController {
    constructor(private readonly service: AuthorService) { }

    @Post('create')
    @UseGuards(JWTAuthGuard)
    async create(@Body() author: AuthorEntity ) {
        const result = await this.service.create(author);
        return result
    }

    @Post()
    @UseGuards(JWTAuthGuard)
    async getAuthors(@Body() filter: BaseFilter) {
       const data = await this.service.getAuthors(filter)
       return await {data: data, count: data.length} 
    }
    @Post('get')
    @UseGuards(JWTAuthGuard)
    async getAllAuthors() {
        const result = await this.service.getAllAuthors()
        return result
    }
}