import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/account/authentication/authGuard';
import { UserFilter } from 'src/interfaces/filters/userFilter';
import { Role } from 'src/shared/enums';
import { AdminUserService } from './admin.user.service';

@Controller('admin')
export class AdminUserController {
    constructor(private readonly service: AdminUserService){}

    @Post('user')
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async GetUser(@Body() filter: UserFilter) {
        const result = await this.service.GetUsers(filter)
       return {data: result, count:result.length}
    }

    @Post('block')
    @UseGuards(new JWTAuthGuard(Role.Admin))
    async  BlockUser(@Body() id:number) {
        const result = this.service.BlockUser(id)
        return result
    }
}
