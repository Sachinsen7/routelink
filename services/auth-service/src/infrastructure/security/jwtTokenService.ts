import jwt from 'jsonwebtoken'
import { AuthTokens, TokenPayload, TokenService } from '../../application/ports/tokenService'

export class JwtTokenService implements TokenService {
    constructor(
        private readonly accessSecret: string,
        private readonly refreshSecret: string
    ) {}

    issueTokens(payload: TokenPayload): AuthTokens {
        const accessToken = jwt.sign(payload, this.accessSecret, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, this.refreshSecret, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken,
        }
    }

    verifyRefreshToken(token: string): TokenPayload {
        return jwt.verify(token, this.refreshSecret) as TokenPayload
    }
}
