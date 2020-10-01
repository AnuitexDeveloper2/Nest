import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserEntity } from 'src/entities/user.entity';
import { UserFilter } from 'src/interfaces/filters/userFilter';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class AdminUserService {
    constructor(
        @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    ) { }

    async GetUsers(filter: UserFilter) {
        console.log('We are here')
       const res = await this.repository.query(`SELECT * FROM user WHERE user.role <> 0 `);
       return await res
    }
}
