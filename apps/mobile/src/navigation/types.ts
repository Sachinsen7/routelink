import type { NavigatorScreenParams } from '@react-navigation/native'

export type AuthStackParamList = {
    Onboarding: undefined
    LoginSignup: undefined
    OtpVerification: undefined
}

export type MainTabParamList = {
    Home: undefined
    Discover: undefined
    Post: undefined
    Chat: undefined
    Profile: undefined
}

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>
    MainTabs: NavigatorScreenParams<MainTabParamList>
    Verification: undefined
    RouteDetail: { routeId: string }
    PostRoute: undefined
    Notifications: undefined
    Payment: { routeRequestId: string; amount: number; routeLabel?: string }
    ChatRoom: {
        roomId?: string
        routeId?: string
        partnerName?: string
        partnerSubtitle?: string
    }
}
