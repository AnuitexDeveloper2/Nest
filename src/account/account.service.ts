import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
//for MongoDB

//for MySQL
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseModel } from 'src/interfaces/responceModel';
import { LocalStrategy } from './authentication/local.strategy';
import { JWTStrategy } from './authentication/jwtStrategy';
import { MyLogger } from 'src/shared/logger/logger';
import { generatePassword } from 'src/shared/helpers/generatePassword';
import { sendingPassword } from 'src/shared/helpers/emailSender';

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
        user.createdDate = new Date()
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

    async ForgotPassword(email: string): Promise<boolean> {
        this.logger.log(`ForgotPassword() with params = ${email}`)
        const user = await this.GetByEmail(email)
        if (!user) {
            return false
        }

        const password = generatePassword()
        const result = sendingPassword(user,password)

        if (!result) {
            return false
        }
        const salt = genSaltSync(10);
        user.passwordHash = hashSync(password, salt);
        const saveResult = await this.repository.save(user)
        if (!saveResult) {
            return false
        }
        return true
    }

    async ConfirmEmail(id: number): Promise<boolean> {
        const user = await this.repository.findOne(id)
        if (!user) {
            return false
        }
        user.confirmedEmail = true
        const result = this.repository.save(user)
        if (!result) {
            return false
        }
        return true
    }
}
