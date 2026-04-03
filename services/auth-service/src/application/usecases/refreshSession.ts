import { AuthRepository } from '../ports/authRepository'
import { AuthTokens, TokenService } from '../ports/tokenService'

export class RefreshSession {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenService: TokenService
    ) {}

    async execute(refreshToken: string): Promise<AuthTokens> {
        const payload = this.tokenService.verifyRefreshToken(refreshToken)
        const user = await this.authRepository.findUserById(payload.userId)

        if (!user) {
            throw new Error('user not found')
        }

        return this.tokenService.issueTokens({
            userId: user.id,
            phone: user.phone,
            email: user.email,
        })
    }
}
