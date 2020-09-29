import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ValidateModel } from "src/interfaces/validateModel";
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserEntity } from "src/entities/user.entity";

@Injectable()
export class JWTStrategy{
    constructor(private readonly jwtService: JwtService) {

    }

    GenerateTokens(user: ValidateModel) {
        const payload = {
            role: user.user.role,
            id: user.user.id
        }
        const accessToken = this.jwtService.sign(payload,{ expiresIn: '60s', secret: process.env.SECRET })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '24h', secret: process.env.REFRESH_TOKEN_SECRET})
        const response = {
            result: true,
            "AccessToken": accessToken,
            "RefreshToken": refreshToken,
            "User": user.user
          }
        return response
    }

    CheckRefreshToken(request: Request) {
        let jwtPayload;
        try {
             jwtPayload = jwt.verify(<string>request.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                throw new HttpException('Invalid', HttpStatus.UNAUTHORIZED)
              }
        }
        const user = new UserEntity();
        user.id = jwtPayload.id;
        user.role = jwtPayload.role;
        const refresh: ValidateModel = {error: null, user: user}
        return  this.GenerateTokens(refresh)
    }

    
}