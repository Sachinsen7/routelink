import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList, Image, Text, useWindowDimensions, View } from 'react-native'
import { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../components/ui/Button'
import { media } from '../../constants/media'
import { typography } from '../../constants/typography'
import { useAuthFlowStore } from '../../store/authFlowStore'
import { cn } from '../../utils/cn'
import type { AuthStackParamList } from '../../navigation/types'

const slides = [
    {
        key: 'earn',
        title: 'Share your travel route and earn.',
        description:
            'Turn your inter-city travel into earnings by carrying verified packages for others.',
        icon: <Ionicons color="#4648D4" name="navigate" size={22} />,
    },
    {
        key: 'send',
        title: 'Send packages across cities with ease.',
        description:
            'Fast, eco-friendly delivery by travelers already heading to your destination.',
        icon: <MaterialCommunityIcons color="#4648D4" name="package-variant-closed" size={22} />,
    },
    {
        key: 'trust',
        title: 'Build trust with a verified community.',
        description:
            'KYC-ready workflows and real-time route coordination keep every delivery safer.',
        icon: <Ionicons color="#16A34A" name="shield-checkmark" size={22} />,
    },
]

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>

export function OnboardingScreen({ navigation }: Props) {
    const { width } = useWindowDimensions()
    const [index, setIndex] = useState(0)
    const completeOnboarding = useAuthFlowStore((state) => state.completeOnboarding)

    const data = useMemo(
        () =>
            slides.map((slide, slideIndex) => ({ ...slide, image: media.onboarding[slideIndex] })),
        []
    )

    return (
        <SafeAreaView className="flex-1 bg-surface-card">
            <View className="flex-row items-center justify-between px-6 py-4">
                <View className="flex-row items-center gap-3">
                    <View className="h-8 w-8 items-center justify-center rounded-xl bg-brand-700">
                        <Ionicons color="white" name="git-network" size={18} />
                    </View>
                    <Text
                        className={cn(
                            typography.classes.display,
                            'text-xl tracking-[-1px] text-brand-700'
                        )}
                    >
                        RouteLink
                    </Text>
                </View>

                <Text
                    className={cn(typography.classes.label, 'text-sm text-brand-700')}
                    onPress={() => {
                        completeOnboarding()
                        navigation.replace('LoginSignup')
                    }}
                >
                    Skip
                </Text>
            </View>

            <FlatList
                data={data}
                horizontal
                onMomentumScrollEnd={(event) => {
                    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width)
                    setIndex(nextIndex)
                }}
                pagingEnabled
                renderItem={({ item }) => (
                    <View className="flex-1 items-center px-8 pt-8" style={{ width }}>
                        <View className="mb-12 h-[320px] w-[280px] items-center justify-center">
                            <View className="absolute inset-0 rounded-[40px] bg-brand-100" />
                            <Image
                                className="h-[300px] w-[260px] rounded-[40px]"
                                resizeMode="cover"
                                source={{ uri: item.image }}
                            />
                            <View className="absolute bottom-0 right-4 h-14 w-14 items-center justify-center rounded-[20px] bg-surface-card">
                                {item.icon}
                            </View>
                        </View>

                        <Text
                            className={cn(
                                typography.classes.display,
                                'px-3 text-center text-[30px] leading-[36px] text-text-primary'
                            )}
                        >
                            {item.title}
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.bodyMedium,
                                'mt-4 px-6 text-center text-base leading-7 text-text-secondary'
                            )}
                        >
                            {item.description}
                        </Text>
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
            />

            <View className="px-8 pb-12 pt-4">
                <View className="mb-10 flex-row justify-center gap-2">
                    {data.map((slide, dotIndex) => (
                        <View
                            className={
                                dotIndex === index
                                    ? 'h-2 w-8 rounded-pill bg-brand-700'
                                    : 'h-2 w-2 rounded-pill bg-stroke-muted'
                            }
                            key={slide.key}
                        />
                    ))}
                </View>

                <Button
                    fullWidth
                    label="Get Started"
                    onPress={() => {
                        completeOnboarding()
                        navigation.replace('LoginSignup')
                    }}
                />

                <Text
                    className={cn(
                        typography.classes.bodyMedium,
                        'mt-6 text-center text-sm text-text-secondary'
                    )}
                >
                    Already have an account?{' '}
                    <Text
                        className={cn(typography.classes.label, 'text-brand-700')}
                        onPress={() => {
                            completeOnboarding()
                            navigation.replace('LoginSignup')
                        }}
                    >
                        Sign In
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}
