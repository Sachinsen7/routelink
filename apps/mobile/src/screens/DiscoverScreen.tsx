import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { TopBar } from '../components/ui/TopBar'
import { RouteCard } from '../features/home/components/RouteCard'
import { typography } from '../constants/typography'
import { useRoutesStore } from '../store/routesStore'
import { cn } from '../utils/cn'
import type { RootStackParamList } from '../navigation/types'

const chips = [
    { label: 'From / To', icon: 'map-marker-path' as const },
    { label: 'Date', icon: 'calendar-month-outline' as const },
    { label: 'Transport Type', icon: 'car-estate' as const },
    { label: 'Price Range', icon: 'cash-multiple' as const },
]

export function DiscoverScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [query, setQuery] = useState('')
    const { discoverRoutes, searchDiscover, loading } = useRoutesStore()

    useFocusEffect(
        useCallback(() => {
            searchDiscover()
        }, [searchDiscover])
    )

    return (
        <SafeAreaView className="flex-1 bg-surface-base" edges={['top']}>
            <TopBar
                brand
                rightSlot={
                    <Ionicons
                        color="#767586"
                        name="notifications-outline"
                        onPress={() => navigation.navigate('Notifications')}
                        size={22}
                    />
                }
                title="RouteLink"
            />

            <FlatList
                ListFooterComponent={<View className="h-32" />}
                ListHeaderComponent={
                    <View className="gap-6 px-6 pb-8 pt-4">
                        <Text
                            className={cn(
                                typography.classes.display,
                                'text-[34px] leading-[40px] text-text-primary'
                            )}
                        >
                            Discover
                        </Text>

                        <View className="flex-row items-center gap-3 rounded-[28px] bg-surface-card p-2">
                            <View className="flex-1">
                                <Input
                                    containerClassName="bg-transparent"
                                    leftIcon={
                                        <Ionicons color="#767586" name="search-outline" size={18} />
                                    }
                                    onChangeText={setQuery}
                                    placeholder="Where are you shipping to?"
                                    value={query}
                                />
                            </View>
                            <Button
                                label="Search"
                                onPress={() => searchDiscover({ toCity: query || undefined })}
                            />
                        </View>

                        <FlatList
                            contentContainerClassName="gap-3"
                            data={chips}
                            horizontal
                            keyExtractor={(item) => item.label}
                            renderItem={({ item }) => (
                                <View className="flex-row items-center gap-2 rounded-pill bg-surface-high px-5 py-3">
                                    <MaterialCommunityIcons
                                        color="#464554"
                                        name={item.icon}
                                        size={16}
                                    />
                                    <Text
                                        className={cn(
                                            typography.classes.bodyMedium,
                                            'text-sm text-text-primary'
                                        )}
                                    >
                                        {item.label}
                                    </Text>
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                        />

                        <View className="flex-row items-end justify-between">
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-xl text-text-primary'
                                )}
                            >
                                Verified routes nearby
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.label,
                                    'text-xs uppercase text-brand-700'
                                )}
                            >
                                {discoverRoutes.length} live
                            </Text>
                        </View>

                        {loading ? (
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm text-text-secondary'
                                )}
                            >
                                Searching active routes...
                            </Text>
                        ) : null}
                    </View>
                }
                data={discoverRoutes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="mb-6 px-6">
                        <RouteCard
                            actionLabel="Book Space"
                            matchLabel="Verified"
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
