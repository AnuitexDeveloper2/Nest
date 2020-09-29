import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AccountService } from './account.service';
// import { UserDTO } from '../dto/createUserDTO';
import { JWTStrategy } from './authentication/jwtStrategy';
import { Request, Response } from 'express';
@Controller('auth')
export class AccountController {
  constructor(private service: AccountService, private readonly jwtStrategy: JWTStrategy) { }

  @Post('register')
  async Register(@Body() user: any) {
    // return await this.service.Create(user.user)           mongoose 
    return await this.service.CreateORM(user.user)
  }

  @Post('login')
  async SignIn(@Body() body:any) {
    return await this.service.signInORM(body.email, body.password)
  }

  @Post('refreshTokens')
  async RefreshToken(@Req() request: Request, response: Response) {
    const tokens = this.jwtStrategy.CheckRefreshToken(request)
    return tokens;
  }
}
