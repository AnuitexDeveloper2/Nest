import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from 'src/admin/printingEditions/admin.books.service';
import { PrintingEditionFilterModel } from 'src/interfaces/filters/booksFilterModel';
import { ResetPassword, UserModelRequest } from 'src/interfaces/filters/resetModel';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService, private readonly bookService: BookService ) {}

    @Post('home')
    async MainPaige(@Body()filter: PrintingEditionFilterModel) {
        const result = await this.bookService.GetBooks(filter)
        return result
    }

    @Get(':id')
    async GetProfile(@Param('id') id: number) {
        return this.service.GetUser(id)
    }

    @Post('editPassword')
    async ChangePassword(@Body() resetPassword: ResetPassword) {
        const result = this.service.ChangePassword(resetPassword)
        return result
    }

    @Post('edit')
    async ChangeProfile(@Body() userModel: UserModelRequest) {
       const result = this.service.EditProfile(userModel)
       return result
    }
}
