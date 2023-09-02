import { User } from "../../../domain/users/user";
import { UserResponse } from "../../../domain/users/user.entity";
import { UserRepository } from "../../../domain/users/user.repository";

export class UserCrudUseCase {
    constructor(private userRepository: UserRepository) {}
    async save(user: User): Promise<UserResponse | null> {
        const new_user = new User(user);
        return await this.userRepository.save(new_user);
    }
    async update(id: string, user: User): Promise<UserResponse | null> {
        const updated_user = new User(user);
        return await this.userRepository.update(id, updated_user);
    }
    async delete(id: string): Promise<void> {
        return await this.userRepository.delete(id);
    }
    async findAll(page: number): Promise<{users: User[], total_users: number, total_pages: number, current_page: number} | null> {
        return await this.userRepository.findAll(page);
    }
    async findById(id: string): Promise<UserResponse | null> {
        return await this.userRepository.findById(id);
    }
    async findByEmail(email: string): Promise<UserResponse | null> {
        return await this.userRepository.findByEmail(email);
    }
}