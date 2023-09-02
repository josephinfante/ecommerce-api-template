import { User } from "./user";
import { UserResponse } from "./user.entity";

export interface UserRepository {
    save(user: User): Promise<UserResponse | null>;
    update(id: string, user: User): Promise<UserResponse | null>;
    delete(id: string): Promise<void>;
    findAll(page: number): Promise<{users: User[], total_users: number, total_pages: number, current_page: number} | null>;
    findById(id: string): Promise<UserResponse | null>;
    findByEmail(email: string): Promise<UserResponse | null>;
    
    login(email: string, password: string): Promise<UserResponse | null>;
}