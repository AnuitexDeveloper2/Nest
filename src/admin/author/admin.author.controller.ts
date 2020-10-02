import { Body, Controller, Delete, Post, Put, UseGuards, Param } from "@nestjs/common";
import { JWTAuthGuard } from "src/account/authentication/authGuard";
import { AuthorEntity } from "src/entities/author.entity";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { Role } from "src/shared/enums";
import { AuthorService } from "./admin.author..service";

@Controller('admin/author')
export class AuthorController {
    constructor(private readonly service: AuthorService) { }

    @Post('create')
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async create(@Body() author: AuthorEntity ) {
        const result = await this.service.create(author);
        return result
    }

    @Post()
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async getAuthors(@Body() filter: BaseFilter) {
       const data = await this.service.getAuthors(filter)
        
       return await data
    }
    @Post('get')
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async getAllAuthors() {
        const result = await this.service.getAllAuthors()
        return result
    }

    @Put()
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async Update(@Body()author: AuthorEntity) {
        return await this.service.Update(author)
    }

    @Delete(':id')
    // @UseGuards(new JWTAuthGuard(Role.Admin))
    async Delete(@Param('id') id: number) {
        const result = this.service.Remove(id)
        return result
    }
}