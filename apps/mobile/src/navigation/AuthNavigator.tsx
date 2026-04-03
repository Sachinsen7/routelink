import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { LoginSignupScreen } from '../screens/auth/LoginSignupScreen'
import { OnboardingScreen } from '../screens/auth/OnboardingScreen'
import { OtpVerificationScreen } from '../screens/auth/OtpVerificationScreen'
import type { AuthStackParamList } from './types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={OnboardingScreen} name="Onboarding" />
            <Stack.Screen component={LoginSignupScreen} name="LoginSignup" />
            <Stack.Screen component={OtpVerificationScreen} name="OtpVerification" />
        </Stack.Navigator>
    )
}
