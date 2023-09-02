import { UserRepository } from "../../../domain/users/user.repository";

export class UserAuthUseCase {
    constructor(private userRepository: UserRepository) {}
    async login(email: string, password: string): Promise<any | null> {
        return await this.userRepository.login(email, password);
    }
}