export interface AuthUser {
    id: string
    phone: string | null
    email: string | null
    name: string
    phoneVerified: boolean
    emailVerified: boolean
}

export interface CreateUserInput {
    phone?: string
    email?: string
    name: string
}

export interface UpsertOAuthInput {
    userId: string
    provider: string
    providerId: string
    accessToken?: string
    refreshToken?: string
}

export type OtpPurpose = 'LOGIN' | 'SIGNUP'

export interface CreateOtpInput {
    phone: string
    code: string
    purpose: OtpPurpose
    name?: string
    email?: string
    expiresAt: Date
}

export interface OtpRecord {
    id: string
    phone: string
    code: string
    purpose: OtpPurpose
    name: string | null
    email: string | null
    expiresAt: Date
    verified: boolean
}

export interface AuthRepository {
    findUserByPhone(phone: string): Promise<AuthUser | null>
    findUserByEmail(email: string): Promise<AuthUser | null>
    findUserById(id: string): Promise<AuthUser | null>
    createUser(input: CreateUserInput): Promise<AuthUser>
    markPhoneVerified(userId: string): Promise<void>
    upsertOAuthAccount(input: UpsertOAuthInput): Promise<void>
    createOtp(input: CreateOtpInput): Promise<void>
    findValidOtp(phone: string, code: string, purpose: OtpPurpose): Promise<OtpRecord | null>
    findLatestPendingOtp(phone: string, purpose: OtpPurpose): Promise<OtpRecord | null>
    markOtpVerified(otpId: string): Promise<void>
}
