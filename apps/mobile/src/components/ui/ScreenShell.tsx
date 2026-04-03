import type { PropsWithChildren, ReactNode } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { cn } from '../../utils/cn'

type ScreenShellProps = PropsWithChildren<{
    title: string
    subtitle: string
    headerSlot?: ReactNode
}>

export function ScreenShell({ title, subtitle, headerSlot, children }: ScreenShellProps) {
    return (
        <SafeAreaView className="flex-1 bg-surface-base" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="gap-6 px-6 pb-10 pt-4">
                    <View className="gap-4">
                        <View className="gap-2">
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'text-[30px] leading-[36px] text-text-primary'
                                )}
                            >
                                {title}
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'text-[15px] leading-6 text-text-secondary'
                                )}
                            >
                                {subtitle}
                            </Text>
                        </View>
                        {headerSlot ? (
                            <View
                                style={{
                                    shadowColor: colors.text.primary,
                                    shadowOffset: { width: 0, height: 16 },
                                    shadowOpacity: 0.08,
                                    shadowRadius: 32,
                                    elevation: 3,
                                }}
                            >
                                {headerSlot}
                            </View>
                        ) : null}
                    </View>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
