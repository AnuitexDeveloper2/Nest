import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "src/account/authentication/authGuard";
import { BookEntity } from "src/entities/book.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { Role } from "src/shared/enums";
import { BookService } from "./admin.books.service";

@Controller('admin/printing-edition')
export class AdminBooksController {
    constructor(private readonly service: BookService) { }

    @Post('create')
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async Create(@Body() printingEdition: BookEntity) {
        return await this.service.createBooks(printingEdition)
    }

    @Post()
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async GetBooks(@Body() filter: BaseFilter) {
        const data = await this.service.GetBooks(filter)
        return data
    }

    @Delete(':id')
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async Remove(@Param('id') id: number) {
        const result = await this.service.Remove(id)
        return result
    }

    @Put()
    async UpdateBook(@Body() book: BookEntity) {
        const result = this.service.Update(book)
        return result;
    }

} 