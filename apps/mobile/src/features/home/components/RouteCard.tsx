import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

import { Avatar } from '../../../components/ui/Avatar'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { RouteTracker } from '../../../components/ui/RouteTracker'
import { typography } from '../../../constants/typography'
import type { RouteItem } from '../../../types/route'
import { cn } from '../../../utils/cn'
import { formatCompactDate, formatCurrency } from '../../../utils/format'
import { getTravelerPresentation } from '../../../utils/travelers'

type RouteCardProps = {
    route: RouteItem
    actionLabel?: string
    matchLabel?: string
    onPress?: () => void
}

export function RouteCard({
    route,
    actionLabel = 'Book Space',
    matchLabel = 'Verified route',
    onPress,
}: RouteCardProps) {
    const traveler = getTravelerPresentation(route.userId)

    return (
        <Pressable onPress={onPress}>
            <Card className="gap-5 rounded-[28px] bg-surface-card p-6">
                <View className="flex-row items-start justify-between gap-4">
                    <View className="flex-row items-center gap-3">
                        <Avatar name={traveler.name} uri={traveler.image} />
                        <View>
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-base text-text-primary'
                                )}
                            >
                                {traveler.name}
                            </Text>
                            <View className="mt-1 flex-row items-center gap-1">
                                <Ionicons color="#904900" name="star" size={14} />
                                <Text
                                    className={cn(
                                        typography.classes.bodyMedium,
                                        'text-xs text-text-secondary'
                                    )}
                                >
                                    {traveler.rating} ({traveler.deliveries} deliveries)
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Badge label={matchLabel} variant="brand" />
                </View>

                <View className="flex-row items-center justify-between gap-4">
                    <View className="flex-1">
                        <Text
                            className={cn(
                                typography.classes.label,
                                'text-[10px] uppercase text-text-muted'
                            )}
                        >
                            From
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.headline,
                                'mt-1 text-lg text-text-primary'
                            )}
                        >
                            {route.fromCity}
                        </Text>
                    </View>

                    <View className="flex-[1.3] gap-3 px-2">
                        <RouteTracker
                            progress={Math.min(
                                0.8,
                                route.seatsAvailable / Math.max(route.seatsTotal, 1)
                            )}
                        />
                        <View className="items-center">
                            <MaterialCommunityIcons
                                color="#4648D4"
                                name="arrow-right-thin"
                                size={20}
                            />
                        </View>
                    </View>

                    <View className="flex-1 items-end">
                        <Text
                            className={cn(
                                typography.classes.label,
                                'text-[10px] uppercase text-text-muted'
                            )}
                        >
                            To
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.headline,
                                'mt-1 text-lg text-text-primary'
                            )}
                        >
                            {route.toCity}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between rounded-[24px] bg-surface-muted px-4 py-4">
                    <View>
                        <Text
                            className={cn(
                                typography.classes.label,
                                'text-[10px] uppercase text-text-muted'
                            )}
                        >
                            Departure
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.bodyMedium,
                                'mt-1 text-sm text-text-primary'
                            )}
                        >
                            {formatCompactDate(route.departureTime)}
                        </Text>
                    </View>
                    <View className="items-end">
                        <Text
                            className={cn(
                                typography.classes.label,
                                'text-[10px] uppercase text-text-muted'
                            )}
                        >
                            Fare
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.display,
                                'mt-1 text-2xl tracking-[-1px] text-brand-700'
                            )}
                        >
                            {formatCurrency(route.price)}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <Ionicons color="#464554" name="car-outline" size={16} />
                        <Text
                            className={cn(
                                typography.classes.bodyMedium,
                                'text-sm text-text-secondary'
                            )}
                        >
                            {route.transportMode}
                        </Text>
                    </View>

                    <Text
                        className={cn(typography.classes.label, 'text-xs uppercase text-brand-700')}
                    >
                        {actionLabel}
                    </Text>
                </View>
            </Card>
        </Pressable>
    )
}
