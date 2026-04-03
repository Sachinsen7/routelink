import { BlurView } from 'expo-blur'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from '../constants/colors'
import { shadows } from '../constants/shadows'
import { typography } from '../constants/typography'
import { HomeScreen } from '../features/home/screens/HomeScreen'
import { ChatScreen } from '../screens/ChatScreen'
import { DiscoverScreen } from '../screens/DiscoverScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { useNotificationsStore } from '../store/notificationsStore'
import type { MainTabParamList, RootStackParamList } from './types'

const Tab = createBottomTabNavigator<MainTabParamList>()

function PostPlaceholderScreen() {
    return null
}

function getTabLabel(routeName: keyof MainTabParamList) {
    switch (routeName) {
        case 'Home':
            return 'Home'
        case 'Discover':
            return 'Discover'
        case 'Post':
            return 'Post'
        case 'Chat':
            return 'Chat'
        case 'Profile':
            return 'Profile'
    }
}

function renderTabIcon(routeName: keyof MainTabParamList, color: string, focused: boolean) {
    const wrapperClassName = focused
        ? 'min-w-[58px] items-center rounded-[18px] bg-brand-100 px-4 py-2'
        : 'min-w-[58px] items-center px-4 py-2'

    switch (routeName) {
        case 'Home':
            return (
                <View className={wrapperClassName}>
                    <Ionicons color={color} name={focused ? 'home' : 'home-outline'} size={22} />
                </View>
            )
        case 'Discover':
            return (
                <View className={wrapperClassName}>
                    <Ionicons
                        color={color}
                        name={focused ? 'compass' : 'compass-outline'}
                        size={22}
                    />
                </View>
            )
        case 'Post':
            return (
                <View className={wrapperClassName}>
                    <MaterialCommunityIcons color={color} name="plus-circle" size={26} />
                </View>
            )
        case 'Chat':
            return (
                <View className={wrapperClassName}>
                    <MaterialCommunityIcons
                        color={color}
                        name={focused ? 'message-text' : 'message-text-outline'}
                        size={22}
                    />
                </View>
            )
        case 'Profile':
            return (
                <View className={wrapperClassName}>
                    <MaterialCommunityIcons
                        color={color}
                        name={focused ? 'account-circle' : 'account-circle-outline'}
                        size={24}
                    />
                </View>
            )
    }
}

function TabBarSurface() {
    return (
        <View
            style={{
                flex: 1,
                overflow: 'hidden',
                borderRadius: 24,
                backgroundColor: 'rgba(255,255,255,0.72)',
            }}
        >
            <BlurView intensity={45} style={StyleSheet.absoluteFillObject} tint="light" />
        </View>
    )
}

function getTabOptions(routeName: keyof MainTabParamList): BottomTabNavigationOptions {
    return {
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.brand['700'],
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 18,
            height: 92,
            paddingTop: 8,
            paddingBottom: 10,
            borderTopWidth: 0,
            borderRadius: 24,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            ...shadows.floating,
        },
        tabBarItemStyle: {
            justifyContent: 'center',
        },
        tabBarBackground: () => <TabBarSurface />,
        tabBarLabel: ({ focused, color }) => (
            <Text
                className={`${typography.classes.bodyMedium} mt-1 text-center text-[11px] ${
                    focused ? 'text-brand-700' : 'text-text-muted'
                }`}
                numberOfLines={1}
                style={{ color }}
            >
                {getTabLabel(routeName)}
            </Text>
        ),
        tabBarIcon: ({ focused, color }) => renderTabIcon(routeName, color, focused),
    }
}

export function TabNavigator() {
    const navigation = useNavigation()
    const unreadCount = useNotificationsStore(
        (state) => state.items.filter((item) => !item.read).length
    )

    return (
        <Tab.Navigator screenOptions={({ route }) => getTabOptions(route.name)}>
            <Tab.Screen component={HomeScreen} name="Home" />
            <Tab.Screen component={DiscoverScreen} name="Discover" />
            <Tab.Screen
                component={PostPlaceholderScreen}
                listeners={{
                    tabPress: (event) => {
                        event.preventDefault()
                        ;(
                            navigation as unknown as {
                                navigate: (name: keyof RootStackParamList) => void
                            }
                        ).navigate('PostRoute')
                    },
                }}
                name="Post"
            />
            <Tab.Screen
                component={ChatScreen}
                name="Chat"
                options={{
                    tabBarBadge: undefined,
                    tabBarAccessibilityLabel:
                        unreadCount > 0
                            ? `Chat tab, ${unreadCount} unread notifications`
                            : 'Chat tab',
                }}
            />
            <Tab.Screen component={ProfileScreen} name="Profile" />
        </Tab.Navigator>
    )
}
