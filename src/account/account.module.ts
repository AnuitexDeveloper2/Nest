import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { UserEntity } from '../entities/user.entity';
import { AccountService } from './account.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './authentication/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './authentication/jwtStrategy';
import { LoggerModule } from 'src/shared/logger/logger.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({ }),
        PassportModule,
        LoggerModule
    ],
    controllers: [AccountController],
    providers: [AccountService, LocalStrategy, JWTStrategy],
})
export class AccountModule { }
