import { ChatRepository, CreateRoomInput } from '../ports/chatRepository'

export class CreateChatRoom {
    constructor(private readonly chatRepository: ChatRepository) {}

    execute(input: CreateRoomInput) {
        if (!input.routeId) {
            throw new Error('routeId is required')
        }

        return this.chatRepository.createRoom(input)
    }
}
