import { UserRepository } from '../ports/userRepository'

export class GetUserProfile {
    constructor(private readonly userRepository: UserRepository) {}

    execute(userId: string) {
        return this.userRepository.getUserProfile(userId)
    }
}
