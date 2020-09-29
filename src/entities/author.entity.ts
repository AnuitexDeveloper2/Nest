import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base";

@Entity('Author')
export class AuthorEntity extends BaseEntity{
    
    @Column()
    name: string
}