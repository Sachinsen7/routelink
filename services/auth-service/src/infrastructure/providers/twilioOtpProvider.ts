import twilio, { Twilio } from 'twilio'

export interface OtpDeliveryResult {
    delivered: boolean
    providerMessageId?: string
}

export class TwilioOtpProvider {
    private readonly client: Twilio | null
    private readonly fromPhone: string | null
    private readonly verifyServiceSid: string | null

    constructor(
        accountSid?: string,
        authToken?: string,
        fromPhone?: string,
        verifyServiceSid?: string
    ) {
        this.client = accountSid && authToken ? twilio(accountSid, authToken) : null
        this.fromPhone = fromPhone || null
        this.verifyServiceSid = verifyServiceSid || null
    }

    usesProviderVerification() {
        return Boolean(this.client && this.verifyServiceSid)
    }

    async sendOtp(phone: string, code: string): Promise<OtpDeliveryResult> {
        if (!this.client) {
            return { delivered: false }
        }

        const formattedPhone = this.normalizePhone(phone)

        if (this.verifyServiceSid) {
            const verification = await this.client.verify.v2
                .services(this.verifyServiceSid)
                .verifications.create({
                    to: formattedPhone,
                    channel: 'sms',
                })

            return {
                delivered: verification.status === 'pending',
                providerMessageId: verification.sid,
            }
        }

        if (!this.fromPhone) {
            return { delivered: false }
        }

        const message = await this.client.messages.create({
            to: formattedPhone,
            from: this.fromPhone,
            body: `Your RouteLink OTP is ${code}`,
        })

        return {
            delivered: true,
            providerMessageId: message.sid,
        }
    }

    async verifyOtp(phone: string, code: string): Promise<boolean> {
        if (!this.client || !this.verifyServiceSid) {
            return true
        }

        const formattedPhone = this.normalizePhone(phone)

        const verificationCheck = await this.client.verify.v2
            .services(this.verifyServiceSid)
            .verificationChecks.create({
                to: formattedPhone,
                code,
            })

        return verificationCheck.status === 'approved'
    }

    private normalizePhone(phone: string) {
        const trimmedPhone = phone.trim()

        if (/^\+[1-9]\d{7,14}$/.test(trimmedPhone)) {
            return trimmedPhone
        }

        const digits = trimmedPhone.replace(/\D/g, '')

        if (digits.length === 10) {
            return `+91${digits}`
        }

        if (digits.length === 11 && digits.startsWith('0')) {
            return `+91${digits.slice(1)}`
        }

        if (digits.length === 12 && digits.startsWith('91')) {
            return `+${digits}`
        }

        throw new Error('phone number must be a valid mobile number')
    }
}
