import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserEntity } from 'src/entities/user.entity';
import { UserFilter } from 'src/interfaces/filters/userFilter';
import { MyLogger } from 'src/shared/logger/logger';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class AdminUserService {
    constructor(
        @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
        private readonly logger: MyLogger
    ) { }

    async GetUsers(filter: UserFilter) {
        this.logger.log(`GetUsers() with params = ${JSON.stringify(filter)}`)
        const take = filter.pageSize
        const skip = filter.pageSize * (filter.pageNumber - 1)
        const res = await this.repository.query(`SELECT * FROM user WHERE user.role <> 0 LIMIT ${take} OFFSET ${skip}`);
        return await res
    }

    async BlockUser(id: number) {
        const user = await this.repository.findOne(id)
        user.status = !user.status
        const result = await this.repository.save(user)
        if (!result) {
            return false
        }

        return true
    }
}
