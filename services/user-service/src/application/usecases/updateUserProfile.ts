import { UpdateUserProfileInput, UserRepository } from '../ports/userRepository'

export class UpdateUserProfile {
    constructor(private readonly userRepository: UserRepository) {}

    execute(input: UpdateUserProfileInput) {
        if (!input.userId) {
            throw new Error('userId is required')
        }

        if (!input.name) {
            throw new Error('name is required')
        }

        return this.userRepository.upsertUserProfile(input)
    }
}
