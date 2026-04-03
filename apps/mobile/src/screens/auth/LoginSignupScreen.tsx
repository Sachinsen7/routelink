import { Ionicons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { media } from '../../constants/media'
import { typography } from '../../constants/typography'
import { useAuthFlowStore } from '../../store/authFlowStore'
import { cn } from '../../utils/cn'
import type { AuthStackParamList } from '../../navigation/types'

type Props = NativeStackScreenProps<AuthStackParamList, 'LoginSignup'>

export function LoginSignupScreen({ navigation }: Props) {
    const { mode, phone, name, email, loading, error, setMode, setField, requestOtpCode } =
        useAuthFlowStore()

    async function handleContinue() {
        const success = await requestOtpCode()
        if (success) {
            navigation.navigate('OtpVerification')
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-surface-base">
            <ScrollView contentContainerClassName="px-6 pb-12" showsVerticalScrollIndicator={false}>
                <View className="pt-6">
                    <Text
                        className={cn(
                            typography.classes.display,
                            'text-[30px] tracking-[-1px] text-brand-700'
                        )}
                    >
                        RouteLink
                    </Text>
                </View>

                <View className="mt-8 gap-6">
                    <Image
                        className="h-64 w-full rounded-[40px]"
                        resizeMode="cover"
                        source={{ uri: media.routeMap }}
                    />

                    <View className="gap-2">
                        <Text
                            className={cn(
                                typography.classes.display,
                                'text-[32px] leading-[38px] text-text-primary'
                            )}
                        >
                            {mode === 'LOGIN' ? 'Welcome back' : 'Create your RouteLink account'}
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.bodyMedium,
                                'text-base leading-7 text-text-secondary'
                            )}
                        >
                            {mode === 'LOGIN'
                                ? 'Enter your phone number to receive a one-time passcode.'
                                : 'Start with your name and phone number. We will verify you with OTP.'}
                        </Text>
                    </View>

                    <View className="flex-row rounded-pill bg-surface-container p-1">
                        <Text
                            className={cn(
                                typography.classes.label,
                                `flex-1 rounded-pill px-4 py-3 text-center text-sm ${
                                    mode === 'LOGIN'
                                        ? 'bg-surface-card text-brand-700'
                                        : 'text-text-muted'
                                }`
                            )}
                            onPress={() => setMode('LOGIN')}
                        >
                            Sign In
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.label,
                                `flex-1 rounded-pill px-4 py-3 text-center text-sm ${
                                    mode === 'SIGNUP'
                                        ? 'bg-surface-card text-brand-700'
                                        : 'text-text-muted'
                                }`
                            )}
                            onPress={() => setMode('SIGNUP')}
                        >
                            Create Account
                        </Text>
                    </View>

                    {mode === 'SIGNUP' ? (
                        <Input
                            label="Full Name"
                            onChangeText={(value) => setField('name', value)}
                            placeholder="Your full name"
                            value={name}
                        />
                    ) : null}

                    <Input
                        keyboardType="phone-pad"
                        label="Phone Number"
                        leftIcon={
                            <Text
                                className={cn(
                                    typography.classes.label,
                                    'text-sm text-text-primary'
                                )}
                            >
                                +91
                            </Text>
                        }
                        maxLength={10}
                        onChangeText={(value) => setField('phone', value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        value={phone}
                    />

                    {mode === 'SIGNUP' ? (
                        <Input
                            keyboardType="email-address"
                            label="Email"
                            onChangeText={(value) => setField('email', value)}
                            placeholder="name@example.com"
                            value={email}
                        />
                    ) : null}

                    {error ? (
                        <Text
                            className={cn(typography.classes.bodyMedium, 'text-sm text-danger-500')}
                        >
                            {error}
                        </Text>
                    ) : null}

                    <Button
                        fullWidth
                        label={loading ? 'Sending OTP...' : 'Get OTP'}
                        onPress={handleContinue}
                    />

                    <View className="flex-row items-center gap-3">
                        <View className="h-px flex-1 bg-stroke-muted" />
                        <Text
                            className={cn(
                                typography.classes.label,
                                'text-[11px] uppercase text-text-muted'
                            )}
                        >
                            or continue with
                        </Text>
                        <View className="h-px flex-1 bg-stroke-muted" />
                    </View>

                    <Button
                        fullWidth
                        label="Google"
                        onPress={() =>
                            Alert.alert(
                                'Coming soon',
                                'Google sign-in is not wired yet in this mobile build.'
                            )
                        }
                        variant="secondary"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
