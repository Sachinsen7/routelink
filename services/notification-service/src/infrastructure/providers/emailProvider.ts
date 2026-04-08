import nodemailer, { Transporter } from 'nodemailer'

export interface SendEmailInput {
    to: string
    subject: string
    html: string
}

export class EmailProvider {
    private readonly transporter: Transporter | null
    private readonly fromEmail: string | null

    constructor(host?: string, port?: string, user?: string, pass?: string, fromEmail?: string) {
        const parsedPort = port ? Number(port) : NaN
        const isConfigured = Boolean(host && !Number.isNaN(parsedPort) && user && pass && fromEmail)

        this.transporter = isConfigured
            ? nodemailer.createTransport({
                  host,
                  port: parsedPort,
                  auth: {
                      user,
                      pass,
                  },
              })
            : null

        this.fromEmail = fromEmail || null
    }

    async send(input: SendEmailInput) {
        if (!this.transporter || !this.fromEmail) {
            return null
        }

        return this.transporter.sendMail({
            from: this.fromEmail,
            to: input.to,
            subject: input.subject,
            html: input.html,
        })
    }
}
