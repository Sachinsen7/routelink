import twilio, { Twilio } from 'twilio'

export class SmsProvider {
    private readonly client: Twilio | null
    private readonly fromPhone: string | null

    constructor(accountSid?: string, authToken?: string, fromPhone?: string) {
        this.client = accountSid && authToken ? twilio(accountSid, authToken) : null
        this.fromPhone = fromPhone || null
    }

    async send(to: string, body: string) {
        if (!this.client || !this.fromPhone) {
            return null
        }

        return this.client.messages.create({
            to,
            from: this.fromPhone,
            body,
        })
    }
}
