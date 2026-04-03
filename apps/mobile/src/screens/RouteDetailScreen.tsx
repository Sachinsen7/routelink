import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { RouteTracker } from '../components/ui/RouteTracker'
import { TopBar } from '../components/ui/TopBar'
import { media } from '../constants/media'
import { typography } from '../constants/typography'
import { useChatStore } from '../store/chatStore'
import { useRoutesStore } from '../store/routesStore'
import { useSessionStore } from '../store/sessionStore'
import { cn } from '../utils/cn'
import { formatCompactDate, formatCurrency } from '../utils/format'
import { getTravelerPresentation } from '../utils/travelers'
import type { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'RouteDetail'>

export function RouteDetailScreen({ navigation, route }: Props) {
    const { selectedRoute, loadRouteDetail, requestSpace, requesting } = useRoutesStore()
    const ensureRoom = useChatStore((state) => state.ensureRoom)
    const requesterId = useSessionStore((state) => state.userId)

    useEffect(() => {
        loadRouteDetail(route.params.routeId)
    }, [loadRouteDetail, route.params.routeId])

    if (!selectedRoute) {
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
                    title="Route details"
                />
                <View className="flex-1 items-center justify-center">
                    <Text
                        className={cn(typography.classes.bodyMedium, 'text-sm text-text-secondary')}
                    >
                        Loading route details...
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    const routeDetail = selectedRoute
    const traveler = getTravelerPresentation(routeDetail.userId)

    async function handleRequest(type: 'RIDE' | 'PACKAGE') {
        const routeRequestId = await requestSpace({
            routeId: routeDetail.id,
            type,
            message:
                type === 'PACKAGE'
                    ? 'Requesting delivery space for a package.'
                    : 'Requesting a seat on this route.',
            seatsRequested: type === 'RIDE' ? 1 : undefined,
            packageSizeKg: type === 'PACKAGE' ? 2 : undefined,
        })

        if (!routeRequestId || !requesterId) {
            return
        }

        await ensureRoom({
            routeId: routeDetail.id,
            routeRequestId,
            participantUserIds: [routeDetail.userId, requesterId],
            partnerName: traveler.name,
            partnerSubtitle: `${routeDetail.toCity} traveler`,
        })

        navigation.navigate('Payment', {
            routeRequestId,
            amount: routeDetail.price,
            routeLabel: `${routeDetail.fromCity} -> ${routeDetail.toCity}`,
        })
    }

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
                rightSlot={
                    <View className="flex-row gap-2">
                        <Ionicons color="#767586" name="share-outline" size={20} />
                        <Ionicons color="#767586" name="notifications-outline" size={20} />
                    </View>
                }
                title="RouteLink"
            />

            <ScrollView
                contentContainerClassName="gap-6 px-4 pb-32 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <Image className="h-72 w-full rounded-[24px]" source={{ uri: media.routeMap }} />

                <Card className="gap-6 bg-surface-card p-6">
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm text-text-secondary'
                                )}
                            >
                                Scheduled departure
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'mt-2 text-[28px] leading-[34px] text-text-primary'
                                )}
                            >
                                {formatCompactDate(routeDetail.departureTime)}
                            </Text>
                        </View>
                        <Badge label={routeDetail.transportMode} variant="secondary" />
                    </View>

                    <View className="gap-4">
                        <View className="flex-row items-center justify-between">
                            <View>
                                <Text
                                    className={cn(
                                        typography.classes.label,
                                        'text-xs uppercase text-brand-700'
                                    )}
                                >
                                    From
                                </Text>
                                <Text
                                    className={cn(
                                        typography.classes.headline,
                                        'mt-1 text-xl text-text-primary'
                                    )}
                                >
                                    {routeDetail.fromCity}
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text
                                    className={cn(
                                        typography.classes.label,
                                        'text-xs uppercase text-text-muted'
                                    )}
                                >
                                    To
                                </Text>
                                <Text
                                    className={cn(
                                        typography.classes.headline,
                                        'mt-1 text-xl text-text-primary'
                                    )}
                                >
                                    {routeDetail.toCity}
                                </Text>
                            </View>
                        </View>

                        <RouteTracker
                            progress={
                                1 - routeDetail.seatsAvailable / Math.max(routeDetail.seatsTotal, 1)
                            }
                        />

                        <View className="flex-row gap-3">
                            <Card className="flex-1 bg-surface-muted p-4">
                                <Text
                                    className={cn(
                                        typography.classes.label,
                                        'text-[10px] uppercase text-text-muted'
                                    )}
                                >
                                    Distance
                                </Text>
                                <Text
                                    className={cn(
                                        typography.classes.headline,
                                        'mt-2 text-lg text-text-primary'
                                    )}
                                >
                                    {Math.max(
                                        120,
                                        Math.round(
                                            Math.abs(routeDetail.toLat - routeDetail.fromLat) * 1000
                                        ) || 984
                                    )}{' '}
                                    KM
                                </Text>
                            </Card>
                            <Card className="flex-1 bg-surface-muted p-4">
                                <Text
                                    className={cn(
                                        typography.classes.label,
                                        'text-[10px] uppercase text-text-muted'
                                    )}
                                >
                                    Seats left
                                </Text>
                                <Text
                                    className={cn(
                                        typography.classes.headline,
                                        'mt-2 text-lg text-text-primary'
                                    )}
                                >
                                    {routeDetail.seatsAvailable}
                                </Text>
                            </Card>
                        </View>
                    </View>
                </Card>

                <Card className="gap-5 bg-surface-card p-6">
                    <View className="flex-row gap-4">
                        <Image
                            className="h-32 w-24 rounded-[20px]"
                            source={{ uri: traveler.image }}
                        />
                        <View className="flex-1 gap-2">
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'text-[28px] text-text-primary'
                                )}
                            >
                                {traveler.name}
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm leading-6 text-text-secondary'
                                )}
                            >
                                Frequent traveler with a strong reliability history across
                                high-demand city pairs.
                            </Text>
                            <Badge label={`Rating ${traveler.rating}`} variant="warning" />
                        </View>
                    </View>

                    <View className="flex-row flex-wrap gap-2">
                        <Badge label="Phone verified" variant="brand" />
                        <Badge label="ID verified" variant="secondary" />
                        <Badge label="Trusted carrier" variant="success" />
                    </View>
                </Card>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 border-t border-stroke-muted bg-white/80 px-4 pb-8 pt-4">
                <View className="flex-row items-center justify-between gap-4">
                    <View>
                        <Text
                            className={cn(
                                typography.classes.label,
                                'text-xs uppercase text-text-muted'
                            )}
                        >
                            Estimated fare
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.display,
                                'mt-1 text-[28px] text-text-primary'
                            )}
                        >
                            {formatCurrency(routeDetail.price)}
                        </Text>
                    </View>
                    <View className="flex-1 flex-row gap-3">
                        <Button
                            fullWidth
                            label={requesting ? 'Requesting...' : 'Send Package'}
                            onPress={() => handleRequest('PACKAGE')}
                            variant="secondary"
                        />
                        <Button
                            fullWidth
                            label={requesting ? 'Requesting...' : 'Request Ride'}
                            onPress={() => handleRequest('RIDE')}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
