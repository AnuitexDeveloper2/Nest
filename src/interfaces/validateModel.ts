import { UserEntity } from "src/entities/user.entity";

export interface ValidateModel {
    error: string,
    user: UserEntity
}