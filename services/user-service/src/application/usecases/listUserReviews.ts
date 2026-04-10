import { UserRepository } from '../ports/userRepository'

export class ListUserReviews {
    constructor(private readonly userRepository: UserRepository) {}

    execute(userId: string) {
        return this.userRepository.listReviews(userId)
    }
}
