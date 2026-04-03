import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { TopBar } from '../components/ui/TopBar'
import { RouteTracker } from '../components/ui/RouteTracker'
import { typography } from '../constants/typography'
import { usePostRouteStore } from '../store/postRouteStore'
import { cn } from '../utils/cn'
import type { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'PostRoute'>

export function PostRouteScreen({ navigation }: Props) {
    const { draft, updateDraft, submitDraft, saving, error } = usePostRouteStore()

    async function handleSubmit() {
        const routeId = await submitDraft()
        if (routeId) {
            navigation.replace('RouteDetail', { routeId })
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-surface-base">
            <TopBar
                leftSlot={
                    <Ionicons
                        color="#464554"
                        name="close"
                        onPress={() => navigation.goBack()}
                        size={22}
                    />
                }
                title="RouteLink"
            />

            <ScrollView
                contentContainerClassName="gap-8 px-6 pb-32 pt-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-3">
                    <Text
                        className={cn(
                            typography.classes.label,
                            'text-xs uppercase tracking-[2px] text-brand-700'
                        )}
                    >
                        Step 1 of 4
                    </Text>
                    <Text
                        className={cn(
                            typography.classes.display,
                            'text-[34px] leading-[40px] text-text-primary'
                        )}
                    >
                        Route details
                    </Text>
                    <Text
                        className={cn(
                            typography.classes.bodyMedium,
                            'text-base leading-7 text-text-secondary'
                        )}
                    >
                        Define your departure and arrival points to help travelers and packages find
                        you.
                    </Text>
                </View>

                <View className="gap-4 rounded-[28px] bg-surface-card p-6">
                    <Input
                        label="From"
                        leftIcon={<Ionicons color="#4648D4" name="navigate" size={18} />}
                        onChangeText={(value) => updateDraft({ fromCity: value })}
                        value={draft.fromCity}
                    />
                    <Input
                        label="To"
                        leftIcon={<Ionicons color="#0051D5" name="location-outline" size={18} />}
                        onChangeText={(value) => updateDraft({ toCity: value })}
                        placeholder="Destination City"
                        value={draft.toCity}
                    />
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <Input
                            label="Departure Date"
                            onChangeText={(value) => updateDraft({ departureDate: value })}
                            placeholder="YYYY-MM-DD"
                            value={draft.departureDate}
                        />
                    </View>
                    <View className="flex-1">
                        <Input
                            label="Departure Time"
                            onChangeText={(value) => updateDraft({ departureTime: value })}
                            placeholder="08:30"
                            value={draft.departureTime}
                        />
                    </View>
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <Input
                            label="Transport Mode"
                            onChangeText={(value) => updateDraft({ transportMode: value })}
                            value={draft.transportMode}
                        />
                    </View>
                    <View className="flex-1">
                        <Input
                            keyboardType="numeric"
                            label="Seats"
                            onChangeText={(value) =>
                                updateDraft({ seatsTotal: Number(value.replace(/\D/g, '') || 0) })
                            }
                            value={String(draft.seatsTotal)}
                        />
                    </View>
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1">
                        <Input
                            keyboardType="numeric"
                            label="Price"
                            onChangeText={(value) =>
                                updateDraft({ price: Number(value.replace(/[^\d.]/g, '') || 0) })
                            }
                            value={String(draft.price)}
                        />
                    </View>
                    <View className="flex-1">
                        <Input
                            label="Description"
                            onChangeText={(value) => updateDraft({ description: value })}
                            placeholder="Short route note"
                            value={draft.description}
                        />
                    </View>
                </View>

                <Card className="gap-4 bg-surface-container">
                    <View className="flex-row items-center gap-3">
                        <View className="h-12 w-12 items-center justify-center rounded-pill bg-surface-card">
                            <MaterialCommunityIcons
                                color="#464554"
                                name="chart-timeline-variant"
                                size={22}
                            />
                        </View>
                        <View className="flex-1">
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-lg text-text-primary'
                                )}
                            >
                                Suggested efficiency
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'mt-1 text-sm leading-6 text-text-secondary'
                                )}
                            >
                                Morning departures from Indiranagar typically find travelers within
                                minutes.
                            </Text>
                        </View>
                    </View>
                    <RouteTracker progress={0.68} />
                </Card>

                {error ? (
                    <Text className={cn(typography.classes.bodyMedium, 'text-sm text-danger-500')}>
                        {error}
                    </Text>
                ) : null}

                <Button
                    fullWidth
                    label={saving ? 'Publishing route...' : 'Continue to Offer Details'}
                    onPress={handleSubmit}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
