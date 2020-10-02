import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "src/account/authentication/authGuard";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { BookService } from "./admin.books.service";

@Controller('admin/printing-edition')
export class AdminBooksController {
    constructor(private readonly service: BookService) { }

    @Post('create')
    @UseGuards(JWTAuthGuard)
    async Create(@Body() printingEdition: BookEntity) {
        return await this.service.createBooks(printingEdition)
    }

    @Post()
    @UseGuards(JWTAuthGuard)
    async GetBooks(@Body() filter: BaseFilter) {
        const data = await this.service.GetBooks(filter)
        return { data: data, count: data.length }
    }

    @Post('remove')
    @UseGuards(JWTAuthGuard)
    async GetBook(@Body() id) {
        const result = await this.service.Remove(id.id)
        return result
    }


    async UpdateBook(@Body() book: BookEntity) {

    }

} 