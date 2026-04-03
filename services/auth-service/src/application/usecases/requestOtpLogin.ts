import { AuthRepository, OtpPurpose } from '../ports/authRepository'
import { TwilioOtpProvider } from '../../infrastructure/providers/twilioOtpProvider'

export class RequestOtpLogin {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly otpProvider: TwilioOtpProvider
    ) {}

    async execute(input: { phone: string; purpose?: OtpPurpose; name?: string; email?: string }) {
        const purpose = input.purpose || 'LOGIN'
        const phone = input.phone.trim()
        const email = input.email?.trim().toLowerCase()
        const name = input.name?.trim()

        if (purpose === 'LOGIN') {
            const user = await this.authRepository.findUserByPhone(phone)
            if (!user) {
                throw new Error('user not found')
            }
        } else {
            if (!name) {
                throw new Error('name is required for signup')
            }

            const existingByPhone = await this.authRepository.findUserByPhone(phone)
            if (existingByPhone) {
                throw new Error('phone already registered')
            }

            if (email) {
                const existingByEmail = await this.authRepository.findUserByEmail(email)
                if (existingByEmail) {
                    throw new Error('email already registered')
                }
            }
        }

        const code = this.otpProvider.usesProviderVerification() ? '' : this.generateCode()
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

        await this.authRepository.createOtp({
            phone,
            code,
            purpose,
            name,
            email,
            expiresAt,
        })

        const delivery = await this.otpProvider.sendOtp(phone, code)

        return {
            phone,
            purpose,
            expiresAt,
            delivered: delivery.delivered,
        }
    }

    private generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
}
