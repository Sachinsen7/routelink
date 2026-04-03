import type { ReactNode } from 'react'
import { memo } from 'react'
import { Pressable, Text, View, type PressableProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { EaseView } from 'react-native-ease'

import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = PressableProps & {
    label: string
    icon?: ReactNode
    variant?: Variant
    fullWidth?: boolean
    className?: string
}

function ButtonComponent({
    label,
    icon,
    variant = 'primary',
    fullWidth,
    className,
    disabled,
    ...rest
}: ButtonProps) {
    return (
        <Pressable className={fullWidth ? 'w-full' : undefined} disabled={disabled} {...rest}>
            {({ pressed }) => (
                <EaseView
                    animate={{ scale: pressed ? 0.98 : 1, opacity: disabled ? 0.55 : 1 }}
                    transition={{ type: 'spring', damping: 18, stiffness: 240 }}
                >
                    {variant === 'primary' ? (
                        <LinearGradient
                            colors={[colors.brand['700'], colors.brand['500']]}
                            end={{ x: 1, y: 1 }}
                            start={{ x: 0, y: 0 }}
                            style={{ borderRadius: 999, width: '100%' }}
                        >
                            <View
                                className={cn(
                                    'h-14 flex-row items-center justify-center gap-2 rounded-pill px-6',
                                    className
                                )}
                            >
                                {icon}
                                <Text
                                    className={cn(
                                        typography.classes.headline,
                                        'text-base text-white'
                                    )}
                                >
                                    {label}
                                </Text>
                            </View>
                        </LinearGradient>
                    ) : (
                        <View
                            className={cn(
                                'h-14 flex-row items-center justify-center gap-2 rounded-pill px-6',
                                variant === 'secondary' ? 'bg-brand-100' : 'bg-transparent',
                                className
                            )}
                        >
                            {icon}
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-base',
                                    variant === 'secondary' ? 'text-brand-950' : 'text-brand-700'
                                )}
                            >
                                {label}
                            </Text>
                        </View>
                    )}
                </EaseView>
            )}
        </Pressable>
    )
}

export const Button = memo(ButtonComponent)
