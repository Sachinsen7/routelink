import { AuthRepository, OtpPurpose } from '../ports/authRepository'
import { AuthTokens, TokenService } from '../ports/tokenService'
import { TwilioOtpProvider } from '../../infrastructure/providers/twilioOtpProvider'

export interface VerifyOtpResult {
    userId: string
    tokens: AuthTokens
}

export class VerifyOtpLogin {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenService: TokenService,
        private readonly otpProvider: TwilioOtpProvider
    ) {}

    async execute(input: {
        phone: string
        code: string
        purpose?: OtpPurpose
    }): Promise<VerifyOtpResult> {
        const purpose = input.purpose || 'LOGIN'
        const phone = input.phone.trim()
        const normalizedCode = input.code.trim()
        const otp = this.otpProvider.usesProviderVerification()
            ? await this.authRepository.findLatestPendingOtp(phone, purpose)
            : await this.authRepository.findValidOtp(phone, normalizedCode, purpose)

        if (!otp) {
            throw new Error('invalid otp')
        }

        if (otp.expiresAt.getTime() < Date.now()) {
            throw new Error('otp expired')
        }

        const providerApproved = await this.otpProvider.verifyOtp(phone, normalizedCode)
        if (!providerApproved) {
            throw new Error('invalid otp')
        }

        let user = await this.authRepository.findUserByPhone(phone)

        if (purpose === 'SIGNUP') {
            if (!otp.name) {
                throw new Error('signup details are missing')
            }

            if (user) {
                throw new Error('phone already registered')
            }

            if (otp.email) {
                const existingByEmail = await this.authRepository.findUserByEmail(otp.email)
                if (existingByEmail) {
                    throw new Error('email already registered')
                }
            }

            user = await this.authRepository.createUser({
                name: otp.name,
                phone,
                email: otp.email || undefined,
            })
        }

        if (!user) {
            throw new Error('user not found')
        }

        await this.authRepository.markOtpVerified(otp.id)
        await this.authRepository.markPhoneVerified(user.id)

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
