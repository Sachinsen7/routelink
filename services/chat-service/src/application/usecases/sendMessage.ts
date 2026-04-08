import { ChatRepository, SendMessageInput } from '../ports/chatRepository'

export class SendMessage {
    constructor(private readonly chatRepository: ChatRepository) {}

    execute(input: SendMessageInput) {
        if (!input.roomId || !input.senderId || !input.content) {
            throw new Error('roomId, senderId and content are required')
        }

        return this.chatRepository.sendMessage(input)
    }
}
