import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { TopBar } from '../components/ui/TopBar'
import { typography } from '../constants/typography'
import { useProfileStore } from '../store/profileStore'
import { cn } from '../utils/cn'
import type { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Verification'>

export function VerificationScreen({ navigation }: Props) {
    const [documentNumber, setDocumentNumber] = useState('')
    const { submitVerification, verifying, error } = useProfileStore()

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
                title="Verify Identity"
            />

            <ScrollView
                contentContainerClassName="gap-6 px-6 pb-12 pt-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-3">
                    <Text
                        className={cn(
                            typography.classes.display,
                            'text-[30px] leading-[36px] text-text-primary'
                        )}
                    >
                        Complete your profile
                    </Text>
                    <Text
                        className={cn(
                            typography.classes.bodyMedium,
                            'text-base leading-7 text-text-secondary'
                        )}
                    >
                        RouteLink uses one-time identity verification to build trust across routes,
                        pickups, and payments.
                    </Text>
                </View>

                <Card className="gap-5 bg-surface-card">
                    <View className="flex-row items-center gap-4">
                        <View className="h-16 w-16 items-center justify-center rounded-[24px] bg-brand-100">
                            <MaterialCommunityIcons
                                color="#4648D4"
                                name="file-lock-outline"
                                size={28}
                            />
                        </View>
                        <View className="flex-1 gap-1">
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-xl text-text-primary'
                                )}
                            >
                                Fast track with DigiLocker
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-sm leading-6 text-text-secondary'
                                )}
                            >
                                Keep the visual entry point ready while the provider integration is
                                finalized.
                            </Text>
                        </View>
                    </View>
                    <Button
                        fullWidth
                        label="Connect DigiLocker"
                        onPress={() => submitVerification(documentNumber || 'DIGILOCKER-PENDING')}
                    />
                </Card>

                <Card className="gap-5 bg-surface-muted">
                    <Text className={cn(typography.classes.headline, 'text-xl text-text-primary')}>
                        Manual verification
                    </Text>
                    <Text
                        className={cn(
                            typography.classes.bodyMedium,
                            'text-sm leading-6 text-text-secondary'
                        )}
                    >
                        Until upload endpoints are available, we submit the entered document number
                        to the verification service.
                    </Text>
                    <Input
                        label="Document Number"
                        onChangeText={setDocumentNumber}
                        placeholder="AADHAAR / PAN / Voter ID"
                        value={documentNumber}
                    />
                    {error ? (
                        <Text
                            className={cn(typography.classes.bodyMedium, 'text-sm text-danger-500')}
                        >
                            {error}
                        </Text>
                    ) : null}
                    <Button
                        fullWidth
                        label={verifying ? 'Submitting...' : 'Submit verification'}
                        onPress={() => submitVerification(documentNumber)}
                        variant="secondary"
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}
