import { Role } from 'src/shared/enums';
import { Column,  Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity('User')
export class UserEntity extends BaseEntity {
    
    @Column({ length: 25, unique: true })
    userName:string;

    @Column() 
    firstName:string;

    @Column() 
    lastName:string;

    @Column({unique: true}) 
    email:string;

    @Column() 
    passwordHash:string;

    @Column({default:Role.User})
    role: Role

    @Column({default:true})
    status: boolean

    @Column({default:false}) 
    confirmedEmail:boolean;

}
