import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Card } from '../ui/Card'
import { TopBar } from '../ui/TopBar'
import { media } from '../../constants/media'
import { typography } from '../../constants/typography'
import { useChatStore } from '../../store/chatStore'
import { useSessionStore } from '../../store/sessionStore'
import { cn } from '../../utils/cn'
import { formatTimeAgo } from '../../utils/format'

type ConversationViewProps = {
    onBack?: () => void
}

export function ConversationView({ onBack }: ConversationViewProps) {
    const [message, setMessage] = useState('')
    const userId = useSessionStore((state) => state.userId)
    const {
        activeRoomId,
        partnerName,
        partnerSubtitle,
        messages,
        loadMessages,
        sendTextMessage,
        sending,
    } = useChatStore()

    useFocusEffect(
        useCallback(() => {
            if (!activeRoomId) return

            loadMessages(activeRoomId)

            const timer = setInterval(() => {
                loadMessages(activeRoomId)
            }, 5000)

            return () => clearInterval(timer)
        }, [activeRoomId, loadMessages])
    )

    useEffect(() => {
        if (activeRoomId) {
            loadMessages(activeRoomId)
        }
    }, [activeRoomId, loadMessages])

    if (!activeRoomId) {
        return (
            <SafeAreaView className="flex-1 bg-surface-base">
                <TopBar title="Chat" />
                <View className="flex-1 items-center justify-center px-6">
                    <Card className="w-full items-center gap-4 bg-surface-card py-10">
                        <View className="h-14 w-14 items-center justify-center rounded-pill bg-brand-100">
                            <MaterialCommunityIcons
                                color="#4648D4"
                                name="message-text-outline"
                                size={26}
                            />
                        </View>
                        <Text
                            className={cn(typography.classes.headline, 'text-lg text-text-primary')}
                        >
                            No active conversation yet
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.bodyMedium,
                                'text-center text-sm leading-6 text-text-secondary'
                            )}
                        >
                            Accept a route request or open a route detail page to start chatting
                            with a verified traveler.
                        </Text>
                    </Card>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-surface-base">
            <TopBar
                leftSlot={
                    onBack ? (
                        <Ionicons color="#464554" name="arrow-back" onPress={onBack} size={22} />
                    ) : undefined
                }
                rightSlot={
                    <View className="flex-row gap-2">
                        <Ionicons color="#767586" name="call-outline" size={20} />
                        <Ionicons color="#767586" name="ellipsis-vertical" size={20} />
                    </View>
                }
                title="Chat"
            />

            <View className="px-6 pb-4">
                <Card className="flex-row items-center gap-3 rounded-[24px] bg-surface-card px-4 py-3">
                    <Image className="h-10 w-10 rounded-pill" source={{ uri: media.traveler }} />
                    <View className="flex-1">
                        <Text
                            className={cn(typography.classes.headline, 'text-sm text-text-primary')}
                        >
                            {partnerName}
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.bodyMedium,
                                'text-xs text-text-secondary'
                            )}
                        >
                            {partnerSubtitle}
                        </Text>
                    </View>
                    <View className="h-3 w-3 rounded-pill bg-success-500" />
                </Card>
            </View>

            <FlatList
                contentContainerClassName="gap-4 px-6 pb-6"
                data={messages}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View className="rounded-[20px] bg-brand-100 px-4 py-3">
                        <Text
                            className={cn(typography.classes.bodyMedium, 'text-xs text-brand-900')}
                        >
                            Always communicate within the app for safety.
                        </Text>
                    </View>
                }
                renderItem={({ item }) => {
                    const mine = item.senderId === userId

                    return (
                        <View className={mine ? 'items-end' : 'items-start'}>
                            <View
                                className={`max-w-[84%] rounded-[24px] px-4 py-3 ${
                                    mine
                                        ? 'rounded-tr-[8px] bg-brand-700'
                                        : 'rounded-tl-[8px] bg-surface-card'
                                }`}
                            >
                                {item.type === 'IMAGE' ? (
                                    <Image
                                        className="mb-3 h-48 w-56 rounded-[18px]"
                                        source={{ uri: media.package }}
                                    />
                                ) : null}
                                <Text
                                    className={cn(
                                        typography.classes.bodyMedium,
                                        `text-sm leading-6 ${mine ? 'text-white' : 'text-text-primary'}`
                                    )}
                                >
                                    {item.content}
                                </Text>
                            </View>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'mt-1 text-[10px] text-text-muted'
                                )}
                            >
                                {formatTimeAgo(item.createdAt)}
                            </Text>
                        </View>
                    )
                }}
                showsVerticalScrollIndicator={false}
            />

            <View className="flex-row items-end gap-3 px-4 pb-8 pt-2">
                <View className="h-12 w-12 items-center justify-center rounded-pill bg-surface-high">
                    <Ionicons color="#767586" name="add" size={20} />
                </View>
                <View className="flex-1 rounded-[24px] bg-surface-muted px-4 py-3">
                    <TextInput
                        className={cn(
                            typography.classes.body,
                            'min-h-10 text-base text-text-primary'
                        )}
                        multiline
                        onChangeText={setMessage}
                        placeholder="Type a message..."
                        placeholderTextColor="#767586"
                        value={message}
                    />
                </View>
                <Pressable
                    className="h-12 w-12 items-center justify-center rounded-pill bg-brand-700"
                    disabled={sending || !message.trim()}
                    onPress={async () => {
                        const nextMessage = message.trim()
                        if (!nextMessage) return

                        await sendTextMessage(nextMessage)
                        setMessage('')
                    }}
                >
                    <Ionicons color="#FFFFFF" name="arrow-up" size={20} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
