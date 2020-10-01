import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/account/authentication/authGuard';
import { UserFilter } from 'src/interfaces/filters/userFilter';
import { AdminUserService } from './admin.user.service';

@Controller('admin')
export class AdminUserController {
    constructor(private readonly service: AdminUserService){}

    @Post('user')
    @UseGuards(JWTAuthGuard)
    async GetUser(@Body() filter: UserFilter) {
        console.log(filter)
        const result = await this.service.GetUsers(filter)
       return {data: result, count:result.length}
    }
}
