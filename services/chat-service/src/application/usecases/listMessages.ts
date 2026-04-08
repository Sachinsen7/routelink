import { ChatRepository } from '../ports/chatRepository'

export class ListMessages {
    constructor(private readonly chatRepository: ChatRepository) {}

    execute(roomId: string) {
        return this.chatRepository.listMessages(roomId)
    }
}
