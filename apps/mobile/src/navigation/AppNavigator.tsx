import { DefaultTheme, NavigationContainer, type Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { colors } from '../constants/colors'
import { useAuthFlowStore } from '../store/authFlowStore'
import { useSessionStore } from '../store/sessionStore'
import { ChatRoomScreen } from '../screens/ChatRoomScreen'
import { NotificationsScreen } from '../screens/NotificationsScreen'
import { PaymentScreen } from '../screens/PaymentScreen'
import { PostRouteScreen } from '../screens/PostRouteScreen'
import { RouteDetailScreen } from '../screens/RouteDetailScreen'
import { VerificationScreen } from '../screens/VerificationScreen'
import { AuthNavigator } from './AuthNavigator'
import { TabNavigator } from './TabNavigator'
import type { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const navigationTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.surface.base,
        primary: colors.brand['700'],
        card: colors.surface.card,
        text: colors.text.primary,
        border: colors.stroke.muted,
        notification: colors.brand['700'],
    },
}

export function AppNavigator() {
    const hasHydrated = useSessionStore((state) => state.hasHydrated)
    const accessToken = useSessionStore((state) => state.accessToken)
    const onboardingCompleted = useAuthFlowStore((state) => state.onboardingCompleted)

    if (!hasHydrated) {
        return null
    }

    const initialAuthRoute = onboardingCompleted ? 'LoginSignup' : 'Onboarding'

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!accessToken ? (
                    <Stack.Screen
                        component={AuthNavigator}
                        initialParams={{ screen: initialAuthRoute }}
                        name="Auth"
                    />
                ) : (
                    <>
                        <Stack.Screen component={TabNavigator} name="MainTabs" />
                        <Stack.Screen component={VerificationScreen} name="Verification" />
                        <Stack.Screen component={RouteDetailScreen} name="RouteDetail" />
                        <Stack.Screen component={PostRouteScreen} name="PostRoute" />
                        <Stack.Screen component={NotificationsScreen} name="Notifications" />
                        <Stack.Screen component={PaymentScreen} name="Payment" />
                        <Stack.Screen component={ChatRoomScreen} name="ChatRoom" />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
