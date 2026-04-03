import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TopBar } from '../components/ui/TopBar'
import { Card } from '../components/ui/Card'
import { typography } from '../constants/typography'
import { useNotificationsStore } from '../store/notificationsStore'
import { cn } from '../utils/cn'
import { formatTimeAgo } from '../utils/format'
import type { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>

const filters = [
    { key: 'ALL', label: 'All' },
    { key: 'MESSAGES', label: 'Messages' },
    { key: 'REQUESTS', label: 'Requests' },
    { key: 'PAYMENTS', label: 'Payments' },
] as const

export function NotificationsScreen({ navigation }: Props) {
    const { items, filter, setFilter, loadNotifications } = useNotificationsStore()

    useFocusEffect(
        useCallback(() => {
            loadNotifications()
        }, [loadNotifications])
    )

    const filteredItems = items.filter((item) => {
        if (filter === 'ALL') return true
        if (filter === 'MESSAGES') return item.type.toLowerCase().includes('message')
        if (filter === 'REQUESTS') return item.type.toLowerCase().includes('request')
        if (filter === 'PAYMENTS') return item.type.toLowerCase().includes('payment')
        return true
    })

    return (
        <SafeAreaView className="flex-1 bg-surface-base">
            <TopBar
                leftSlot={
                    <Ionicons
                        color="#464554"
                        name="arrow-back"
                        onPress={() => navigation.goBack()}
                        size={22}
                    />
                }
                title="Notifications"
            />

            <FlatList
                contentContainerClassName="gap-3 px-4 pb-32 pt-4"
                data={filteredItems}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <FlatList
                        contentContainerClassName="gap-2 pb-6"
                        data={filters}
                        horizontal
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    `rounded-pill px-6 py-3 text-sm ${
                                        filter === item.key
                                            ? 'bg-brand-700 text-white'
                                            : 'border border-stroke-muted bg-surface-card text-text-secondary'
                                    }`
                                )}
                                onPress={() => setFilter(item.key)}
                            >
                                {item.label}
                            </Text>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                }
                renderItem={({ item }) => (
                    <Card className="flex-row gap-4 bg-surface-card p-5">
                        <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-brand-100">
                            <MaterialCommunityIcons
                                color="#4648D4"
                                name={
                                    item.type.toLowerCase().includes('payment')
                                        ? 'cash'
                                        : item.type.toLowerCase().includes('request')
                                          ? 'truck-fast-outline'
                                          : 'message-outline'
                                }
                                size={22}
                            />
                        </View>
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between gap-3">
                                <Text
                                    className={cn(
                                        typography.classes.headline,
                                        'flex-1 text-base text-text-primary'
                                    )}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    className={cn(
                                        typography.classes.bodyMedium,
                                        'text-xs text-text-muted'
                                    )}
                                >
                                    {formatTimeAgo(item.createdAt)}
                                </Text>
                            </View>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'mt-1 text-sm leading-6 text-text-secondary'
                                )}
                            >
                                {item.body}
                            </Text>
                        </View>
                    </Card>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
