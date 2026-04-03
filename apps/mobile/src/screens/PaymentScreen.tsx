import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { TopBar } from '../components/ui/TopBar'
import { typography } from '../constants/typography'
import { usePaymentStore } from '../store/paymentStore'
import { cn } from '../utils/cn'
import { formatCurrency } from '../utils/format'
import type { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>

export function PaymentScreen({ navigation, route }: Props) {
    const { currentIntent, status, createIntent, pollStatus, loading, error } = usePaymentStore()

    useEffect(() => {
        createIntent({
            routeRequestId: route.params.routeRequestId,
            amount: route.params.amount,
        })
    }, [createIntent, route.params.amount, route.params.routeRequestId])

    useEffect(() => {
        if (!currentIntent?.paymentId) return

        pollStatus(currentIntent.paymentId)

        const timer = setInterval(() => {
            pollStatus(currentIntent.paymentId)
        }, 3000)

        return () => clearInterval(timer)
    }, [currentIntent?.paymentId, pollStatus])

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
                    <View className="flex-row items-center gap-2">
                        <Ionicons color="#4648D4" name="shield-checkmark" size={20} />
                        <Text
                            className={cn(
                                typography.classes.label,
                                'text-[11px] uppercase text-text-muted'
                            )}
                        >
                            SafePay
                        </Text>
                    </View>
                }
                title="Secure Checkout"
            />

            <ScrollView
                contentContainerClassName="gap-8 px-6 pb-12 pt-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-2">
                    <Text
                        className={cn(
                            typography.classes.display,
                            'text-[30px] leading-[36px] text-text-primary'
                        )}
                    >
                        Select payment method
                    </Text>
                    <Text
                        className={cn(
                            typography.classes.bodyMedium,
                            'text-base leading-7 text-text-secondary'
                        )}
                    >
                        Choose your preferred method. Payment intent creation and status checks are
                        live.
                    </Text>
                </View>

                <View className="gap-4">
                    <Text
                        className={cn(
                            typography.classes.label,
                            'text-xs uppercase tracking-[2px] text-text-muted'
                        )}
                    >
                        UPI payment
                    </Text>
                    <View className="flex-row gap-4">
                        <Card className="flex-1 gap-3 bg-surface-card">
                            <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-surface-container">
                                <MaterialCommunityIcons color="#4648D4" name="google" size={24} />
                            </View>
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-base text-text-primary'
                                )}
                            >
                                Google Pay
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-xs text-text-secondary'
                                )}
                            >
                                Instant refund support
                            </Text>
                        </Card>
                        <Card className="flex-1 gap-3 bg-surface-container">
                            <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-surface-card">
                                <MaterialCommunityIcons
                                    color="#4648D4"
                                    name="cellphone-nfc"
                                    size={24}
                                />
                            </View>
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-base text-text-primary'
                                )}
                            >
                                PhonePe
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-xs text-text-secondary'
                                )}
                            >
                                Secure UPI gateway
                            </Text>
                        </Card>
                    </View>
                </View>

                <Card className="gap-5 rounded-[28px] bg-surface-container p-6">
                    <Text className={cn(typography.classes.headline, 'text-xl text-text-primary')}>
                        Order summary
                    </Text>

                    <View className="flex-row items-start gap-4">
                        <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-brand-100">
                            <MaterialCommunityIcons
                                color="#4648D4"
                                name="truck-fast-outline"
                                size={22}
                            />
                        </View>
                        <View className="flex-1">
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-base text-text-primary'
                                )}
                            >
                                {route.params.routeLabel || 'Express delivery'}
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'mt-1 text-sm text-text-secondary'
                                )}
                            >
                                RouteLink verified partner • 24h
                            </Text>
                        </View>
                    </View>

                    <View className="gap-4">
                        <View className="flex-row justify-between">
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm text-text-secondary'
                                )}
                            >
                                Base fare
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-sm text-text-primary'
                                )}
                            >
                                {formatCurrency(route.params.amount)}
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm text-text-secondary'
                                )}
                            >
                                Handling
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-sm text-text-primary'
                                )}
                            >
                                {formatCurrency(route.params.amount * 0.12)}
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm text-text-secondary'
                                )}
                            >
                                GST
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-sm text-text-primary'
                                )}
                            >
                                {formatCurrency(route.params.amount * 0.18)}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-end justify-between pt-3">
                        <View>
                            <Text
                                className={cn(
                                    typography.classes.label,
                                    'text-xs uppercase text-text-muted'
                                )}
                            >
                                Total payable
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'mt-1 text-[34px] text-text-primary'
                                )}
                            >
                                {formatCurrency(route.params.amount * 1.3)}
                            </Text>
                        </View>
                        <Text
                            className={cn(
                                typography.classes.label,
                                'rounded-md bg-success-100 px-2 py-1 text-[10px] uppercase text-success-500'
                            )}
                        >
                            Live intent
                        </Text>
                    </View>
                </Card>

                <Card className="gap-3 bg-surface-card">
                    <Text
                        className={cn(
                            typography.classes.label,
                            'text-xs uppercase tracking-[2px] text-text-muted'
                        )}
                    >
                        Payment status
                    </Text>
                    <Text className={cn(typography.classes.headline, 'text-lg text-text-primary')}>
                        {loading
                            ? 'Initializing secure payment...'
                            : status?.status ||
                              currentIntent?.gatewayOrderId ||
                              'Awaiting gateway response'}
                    </Text>
                    {error ? (
                        <Text
                            className={cn(typography.classes.bodyMedium, 'text-sm text-danger-500')}
                        >
                            {error}
                        </Text>
                    ) : null}
                </Card>

                <Button
                    fullWidth
                    label={
                        currentIntent
                            ? `Pay ${formatCurrency(route.params.amount * 1.3)}`
                            : 'Preparing payment'
                    }
                    onPress={() => pollStatus(currentIntent?.paymentId)}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
