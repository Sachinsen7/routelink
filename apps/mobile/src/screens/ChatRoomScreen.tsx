import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'

import { ConversationView } from '../components/chat/ConversationView'
import { useChatStore } from '../store/chatStore'
import type { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>

export function ChatRoomScreen({ navigation, route }: Props) {
    const openRoom = useChatStore((state) => state.openRoom)

    useEffect(() => {
        if (route.params?.roomId) {
            openRoom({
                roomId: route.params.roomId,
                routeId: route.params.routeId,
                partnerName: route.params.partnerName,
                partnerSubtitle: route.params.partnerSubtitle,
            })
        }
    }, [openRoom, route.params])

    return <ConversationView onBack={() => navigation.goBack()} />
}
