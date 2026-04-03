import { OAuth2Client } from 'google-auth-library'

export interface GoogleUserProfile {
    provider: 'google'
    providerId: string
    email?: string
    name?: string
    avatarUrl?: string
}

export class GoogleOAuthProvider {
    private readonly client: OAuth2Client | null
    private readonly clientId: string | null

    constructor(clientId?: string) {
        this.clientId = clientId || null
        this.client = this.clientId ? new OAuth2Client(this.clientId) : null
    }

    async verifyIdToken(idToken: string): Promise<GoogleUserProfile | null> {
        if (!this.client || !this.clientId) {
            return null
        }

        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: this.clientId,
        })

        const payload = ticket.getPayload()
        if (!payload?.sub) {
            return null
        }

        return {
            provider: 'google',
            providerId: payload.sub,
            email: payload.email,
            name: payload.name,
            avatarUrl: payload.picture,
        }
    }
}
