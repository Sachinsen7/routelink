export interface AuthTokens {
    accessToken: string
    refreshToken: string
}

export interface TokenPayload {
    userId: string
    phone?: string | null
    email?: string | null
}

export interface TokenService {
    issueTokens(payload: TokenPayload): AuthTokens
    verifyRefreshToken(token: string): TokenPayload
}
