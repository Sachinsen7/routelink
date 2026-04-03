import axios, { AxiosInstance } from 'axios'

export interface DigiLockerVerificationResult {
    verificationId: string
    status: string
}

export class DigiLockerProvider {
    private readonly client: AxiosInstance | null

    constructor(baseUrl?: string, clientId?: string, clientSecret?: string) {
        if (!baseUrl || !clientId || !clientSecret) {
            this.client = null
            return
        }

        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                'X-Client-Id': clientId,
                'X-Client-Secret': clientSecret,
            },
            timeout: 10000,
        })
    }

    async verifyDocument(documentNumber: string): Promise<DigiLockerVerificationResult | null> {
        if (!this.client) {
            return null
        }

        const response = await this.client.post('/verifications', {
            documentNumber,
        })

        return {
            verificationId: String(response.data?.id || ''),
            status: String(response.data?.status || 'PENDING'),
        }
    }
}
