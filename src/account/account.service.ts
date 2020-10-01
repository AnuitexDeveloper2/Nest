import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hash, hashSync } from 'bcrypt';
//for MongoDB

//for MySQL
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseModel } from 'src/interfaces/responceModel';
import { LocalStrategy } from './authentication/local.strategy';
import { JWTStrategy } from './authentication/jwtStrategy';
import { MyLogger } from 'src/shared/logger/logger';
import { json } from 'express';
import { Role } from 'src/shared/enums';

@Injectable()
export class AccountService {
    private result: ResponseModel
    constructor(
        @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
        private readonly logger: MyLogger,
        private readonly localStrategy: LocalStrategy,
        private readonly jwtStrategy: JWTStrategy,
    ) { }




    // functions for MySQL
    async CreateORM(user: UserEntity): Promise<ResponseModel> {
        this.logger.log(`createORM() with  params ${JSON.stringify(user)}`)
        const isExcist = await this.GetByEmail(user.email)
        if (isExcist) {
            return { result: false, error: 'email is already taken' }
        }
        const salt = genSaltSync(10);
        user.passwordHash = hashSync(user.passwordHash, salt);
        try {

            const newUser = await this.repository.save(user)
            if (!newUser) {
               
            }
        } catch (error) {
            this.result = { result: false, error: error.message }
            return this.result
        }
        this.result = { result: true, error: null }
        return this.result
    }

    async signInORM(email: string, password: string) {
        this.logger.log(`signInORM with params email = ${email} password = ${password}`)
        
        const validate = await this.localStrategy.validate(email, password)
        if (!validate.user) {

        }
        const response = this.jwtStrategy.GenerateTokens(validate)
        return response
    }

    async GetByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.repository.findOne({ email: email })
        return user ? user : null
    }
}
