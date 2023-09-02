import { User } from "../../domain/users/user";
import { UserResponse } from "../../domain/users/user.entity";
import { UserRepository } from "../../domain/users/user.repository";
import userDAO from "./user.dao";

export class UserRepositoryImpl implements UserRepository {
    save(user: User): Promise<UserResponse | null> {
        return userDAO.save(user);
    }
    update(id: string, user: User): Promise<UserResponse | null> {
        return userDAO.update(id, user);
    }
    delete(id: string): Promise<void> {
        return userDAO.delete(id);
    }
    findAll(page: number): Promise<{ users: User[]; total_users: number; total_pages: number; current_page: number; } | null> {
        return userDAO.findAll(page);
    }
    findById(id: string): Promise<UserResponse | null> {
        return userDAO.findById(id);
    }
    findByEmail(email: string): Promise<UserResponse | null> {
        return userDAO.findByEmail(email);
    }
    login(email: string, password: string): Promise<UserResponse | null> {
        return userDAO.login(email, password);
    }
}