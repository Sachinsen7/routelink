import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { typography } from '../../constants/typography'
import { cn } from '../../utils/cn'

type TopBarProps = {
    title: string
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    brand?: boolean
}

export function TopBar({ title, leftSlot, rightSlot, brand }: TopBarProps) {
    return (
        <SafeAreaView className="bg-surface-base" edges={['top']}>
            <View className="h-16 flex-row items-center justify-between px-6">
                <View className="min-w-10">{leftSlot}</View>
                <Text
                    className={cn(
                        brand ? typography.classes.display : typography.classes.headline,
                        brand
                            ? 'text-xl tracking-[-1px] text-brand-700'
                            : 'text-xl text-text-primary'
                    )}
                >
                    {title}
                </Text>
                <View className="min-w-10 items-end">{rightSlot}</View>
            </View>
        </SafeAreaView>
    )
}
