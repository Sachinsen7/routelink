import { AuthRepository } from '../ports/authRepository'
import { AuthTokens, TokenService } from '../ports/tokenService'

export interface SignupInput {
    name: string
    phone?: string
    email?: string
}

export interface SignupResult {
    userId: string
    name: string
    phone: string | null
    email: string | null
    tokens: AuthTokens
}

export class SignupUser {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenService: TokenService
    ) {}

    async execute(input: SignupInput): Promise<SignupResult> {
        if (!input.phone && !input.email) {
            throw new Error('phone or email is required')
        }

        if (input.phone) {
            const existingByPhone = await this.authRepository.findUserByPhone(input.phone)
            if (existingByPhone) {
                throw new Error('phone already registered')
            }
        }

        if (input.email) {
            const existingByEmail = await this.authRepository.findUserByEmail(input.email)
            if (existingByEmail) {
                throw new Error('email already registered')
            }
        }

        const user = await this.authRepository.createUser({
            name: input.name,
            phone: input.phone,
            email: input.email,
        })

        const tokens = this.tokenService.issueTokens({
            userId: user.id,
            phone: user.phone,
            email: user.email,
        })

        return {
            userId: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            tokens,
        }
    }
}
