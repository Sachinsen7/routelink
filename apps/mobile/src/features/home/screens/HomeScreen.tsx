import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { RouteCard } from '../components/RouteCard'
import { typography } from '../../../constants/typography'
import { useNotificationsStore } from '../../../store/notificationsStore'
import { useRoutesStore } from '../../../store/routesStore'
import { cn } from '../../../utils/cn'
import type { RootStackParamList } from '../../../navigation/types'

export function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { recommendedRoutes, loadRecommended, loading } = useRoutesStore()
    const loadNotifications = useNotificationsStore((state) => state.loadNotifications)

    useFocusEffect(
        useCallback(() => {
            loadRecommended()
            loadNotifications()
        }, [loadNotifications, loadRecommended])
    )

    return (
        <SafeAreaView className="flex-1 bg-surface-base" edges={['top']}>
            <FlatList
                ListFooterComponent={<View className="h-32" />}
                ListHeaderComponent={
                    <View className="gap-8 px-6 pb-8 pt-4">
                        <View className="flex-row items-center justify-between">
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'text-2xl tracking-[-1px] text-brand-700'
                                )}
                            >
                                RouteLink
                            </Text>
                            <Ionicons
                                color="#767586"
                                name="notifications-outline"
                                onPress={() => navigation.navigate('Notifications')}
                                size={22}
                            />
                        </View>

                        <Input
                            leftIcon={<Ionicons color="#767586" name="search-outline" size={18} />}
                            onFocus={() => navigation.navigate('MainTabs', { screen: 'Discover' })}
                            placeholder="Where are you shipping to?"
                        />

                        <View className="flex-row gap-4">
                            <Button
                                className="items-start"
                                fullWidth
                                icon={
                                    <MaterialCommunityIcons
                                        color="white"
                                        name="plus-circle-outline"
                                        size={18}
                                    />
                                }
                                label="Post Route"
                                onPress={() => navigation.navigate('PostRoute')}
                            />
                            <Button
                                className="items-start"
                                fullWidth
                                icon={
                                    <MaterialCommunityIcons
                                        color="#07006C"
                                        name="package-variant-closed"
                                        size={18}
                                    />
                                }
                                label="Send Package"
                                onPress={() =>
                                    navigation.navigate('MainTabs', { screen: 'Discover' })
                                }
                                variant="secondary"
                            />
                        </View>

                        <View className="gap-2">
                            <Text
                                className={cn(
                                    typography.classes.label,
                                    'text-xs uppercase tracking-[2px] text-brand-700'
                                )}
                            >
                                Recommended
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'text-[28px] leading-[34px] text-text-primary'
                                )}
                            >
                                AI matched routes
                            </Text>
                        </View>

                        <Card className="gap-3 rounded-[28px] bg-surface-container p-6">
                            <Text
                                className={cn(
                                    typography.classes.label,
                                    'text-xs uppercase tracking-[2px] text-text-muted'
                                )}
                            >
                                Route pulse
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'text-[28px] leading-[34px] text-text-primary'
                                )}
                            >
                                Travelers are moving along your fastest lanes right now.
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-base leading-7 text-text-secondary'
                                )}
                            >
                                Match with verified carriers for same-day or next-day deliveries
                                across major city pairs.
                            </Text>
                        </Card>

                        {loading ? (
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm text-text-secondary'
                                )}
                            >
                                Refreshing live routes...
                            </Text>
                        ) : null}
                    </View>
                }
                data={recommendedRoutes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="mb-4 px-6">
                        <RouteCard
                            actionLabel="View details"
                            matchLabel="AI match"
                            onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}
                            route={item}
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
