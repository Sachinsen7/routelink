export type OtpPurpose = 'LOGIN' | 'SIGNUP'

export type AuthTokens = {
    accessToken: string
    refreshToken: string
}

export type AuthSession = AuthTokens & {
    userId: string
}

export type RequestOtpPayload = {
    phone: string
    purpose: OtpPurpose
    name?: string
    email?: string
}

export type RequestOtpResponse = {
    phone: string
    expiresAt: string
    delivered: boolean
}

export type VerifyOtpPayload = {
    phone: string
    code: string
    purpose: OtpPurpose
}

export type VerifyOtpResponse = {
    userId: string
    tokens: AuthTokens
}
