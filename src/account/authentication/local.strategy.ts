import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync, genSaltSync, hash, hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ValidateModel } from 'src/interfaces/validateModel';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    ) {
        super();
    }

    async validate(email: string, password: string): Promise<ValidateModel> {
        const user = await this.repository.findOne({ email: email })
        if (!user) {
            return { user: null, error: "email is already taken" }
        }
        const isPasswordMatch = compareSync(password, user.passwordHash)
        if (!isPasswordMatch) {
            return { user: null, error: "invalid password" }
        }
        return { user: user, error: '' };
    }
}