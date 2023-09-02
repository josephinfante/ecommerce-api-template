import { UserEntity } from "./user.entity";

export class User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    constructor(user: UserEntity) {
        this._id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }
}