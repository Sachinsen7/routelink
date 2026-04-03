import { AuthRepository } from '../ports/authRepository'
import { AuthTokens, TokenService } from '../ports/tokenService'
import { GoogleOAuthProvider } from '../../infrastructure/providers/googleOAuthProvider'

export interface OAuthLoginResult {
    userId: string
    tokens: AuthTokens
}

export class LoginWithGoogle {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly googleOAuthProvider: GoogleOAuthProvider,
        private readonly tokenService: TokenService
    ) {}

    async execute(idToken: string): Promise<OAuthLoginResult> {
        const profile = await this.googleOAuthProvider.verifyIdToken(idToken)
        if (!profile) {
            throw new Error('invalid oauth token')
        }

        let user = profile.email ? await this.authRepository.findUserByEmail(profile.email) : null

        if (!user) {
            user = await this.authRepository.createUser({
                name: profile.name || 'RouteLink User',
                email: profile.email,
            })
        }

        await this.authRepository.upsertOAuthAccount({
            userId: user.id,
            provider: profile.provider,
            providerId: profile.providerId,
        })

        const tokens = this.tokenService.issueTokens({
            userId: user.id,
            phone: user.phone,
            email: user.email,
        })

        return {
            userId: user.id,
            tokens,
        }
    }
}
