import { UserRepository } from '../ports/userRepository'
import { DigiLockerProvider } from '../../infrastructure/providers/digiLockerProvider'

export class VerifyUserId {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly digiLockerProvider: DigiLockerProvider
    ) {}

    async execute(userId: string, documentNumber: string) {
        if (!userId || !documentNumber) {
            throw new Error('userId and documentNumber are required')
        }

        const verification = await this.digiLockerProvider.verifyDocument(documentNumber)
        const status = verification?.status === 'VERIFIED' ? 'VERIFIED' : 'PENDING'

        await this.userRepository.createVerification({
            userId,
            documentNumber,
            provider: 'digilocker',
            providerRefId: verification?.verificationId,
            status,
        })

        return {
            userId,
            documentNumber,
            status,
            verificationId: verification?.verificationId || null,
        }
    }
}
