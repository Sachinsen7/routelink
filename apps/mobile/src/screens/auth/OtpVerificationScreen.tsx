import { Ionicons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../components/ui/Button'
import { TopBar } from '../../components/ui/TopBar'
import { typography } from '../../constants/typography'
import { useAuthFlowStore } from '../../store/authFlowStore'
import { cn } from '../../utils/cn'
import type { AuthStackParamList } from '../../navigation/types'

type Props = NativeStackScreenProps<AuthStackParamList, 'OtpVerification'>

export function OtpVerificationScreen({ navigation }: Props) {
    const [code, setCode] = useState('')
    const { phone, mode, expiresAt, loading, error, verifyOtpCode, requestOtpCode } =
        useAuthFlowStore()

    async function handleVerify() {
        const success = await verifyOtpCode(code)
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginSignup' }],
            })
        }
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
                title="Verify OTP"
            />

            <View className="flex-1 px-6 pt-8">
                <Text
                    className={cn(
                        typography.classes.display,
                        'text-[32px] leading-[38px] text-text-primary'
                    )}
                >
                    Confirm your number
                </Text>
                <Text
                    className={cn(
                        typography.classes.bodyMedium,
                        'mt-3 text-base leading-7 text-text-secondary'
                    )}
                >
                    We sent a 6-digit code to {phone}.{' '}
                    {mode === 'SIGNUP' ? 'This will finish your account setup.' : ''}
                </Text>

                <TextInput
                    autoFocus
                    className={cn(
                        typography.classes.display,
                        'mt-10 rounded-[28px] bg-surface-highest px-6 py-6 text-center text-[34px] tracking-[10px] text-text-primary'
                    )}
                    keyboardType="number-pad"
                    maxLength={6}
                    onChangeText={(value) => setCode(value.replace(/\D/g, ''))}
                    value={code}
                />

                <View className="mt-6 flex-row justify-center gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View
                            className={`h-2 w-8 rounded-pill ${
                                index < code.length ? 'bg-brand-700' : 'bg-stroke-muted'
                            }`}
                            key={index}
                        />
                    ))}
                </View>

                {expiresAt ? (
                    <Text
                        className={cn(
                            typography.classes.bodyMedium,
                            'mt-6 text-center text-sm text-text-secondary'
                        )}
                    >
                        Code expires at {new Date(expiresAt).toLocaleTimeString('en-IN')}
                    </Text>
                ) : null}

                {error ? (
                    <Text
                        className={cn(
                            typography.classes.bodyMedium,
                            'mt-4 text-center text-sm text-danger-500'
                        )}
                    >
                        {error}
                    </Text>
                ) : null}

                <View className="mt-10 gap-4">
                    <Button
                        fullWidth
                        label={loading ? 'Verifying...' : 'Verify & Continue'}
                        onPress={handleVerify}
                    />
                    <Button
                        fullWidth
                        label="Resend OTP"
                        onPress={() => requestOtpCode()}
                        variant="secondary"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
