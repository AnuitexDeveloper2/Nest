import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { Observable } from "rxjs";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwtAccess') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.accesstoken;
        if (!request.headers.accesstoken) {
            throw new HttpException('Invalid', HttpStatus.UNAUTHORIZED)
        }

        try {
            const res = jwt.verify(accessToken, process.env.SECRET)
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                throw new HttpException('Invalid', HttpStatus.FORBIDDEN)
            }
        }
        return true;
    }


}