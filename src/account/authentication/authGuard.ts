import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { Observable } from "rxjs";
import { AuthGuard } from '@nestjs/passport';
import { Role } from "src/shared/enums";

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwtAccess') {
    constructor(private role: Role) { super() }
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
        const user = <any>jwt.decode(accessToken)
        if (this.role !== user.role) {
            throw new HttpException('Invalid', HttpStatus.UNAUTHORIZED)
        }
        return true;
    }


}