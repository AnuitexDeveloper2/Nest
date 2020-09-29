import { Currency } from "src/shared/enums";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { BaseEntity } from "./base";

@Entity('Book')
export class BookEntity extends BaseEntity {

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    cover_image: string;

    @Column()
    price: number;

    @Column({default: Currency.USD})
    currency: Currency

    @ManyToMany(type => AuthorEntity)@JoinTable()
    authors: AuthorEntity
}