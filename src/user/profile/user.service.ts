import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { BookEntity } from 'src/entities/book.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ResetPassword, UserModelRequest } from 'src/interfaces/filters/resetModel';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {}

    async GetUser(id: number) {
        const user = await this.repository.findOne({id: id})
        return user
    }

    async ChangePassword(resetModel: ResetPassword) {
        const user = await this.repository.findOne({id: resetModel.id})
        const isPasswordMatch = compareSync(resetModel.oldPassword, user.passwordHash)
        if (!isPasswordMatch) {
            return false
        }
        const salt = genSaltSync(10);
        user.passwordHash = hashSync(resetModel.newPassword, salt);
        const result = await this.repository.save(user)
        if (!result) {
            return false
        }
        return true
    }

    async EditProfile(userModel: UserModelRequest) {
        const user = await this.repository.findOne(userModel.id)
        user.firstName = userModel.firstName
        user.lastName = userModel.lastName
        user.email = userModel.email

        const result = this.repository.save(user)
        if (!result) {
            return false
        }

        return true
    }
}
