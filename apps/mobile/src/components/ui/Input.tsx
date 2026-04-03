import type { ReactNode } from 'react'
import { useState } from 'react'
import { Text, TextInput, View, type TextInputProps } from 'react-native'

import { colors } from '../../constants/colors'
import { typography } from '../../constants/typography'
import { cn } from '../../utils/cn'

type InputProps = TextInputProps & {
    label?: string
    hint?: string
    error?: string | null
    leftIcon?: ReactNode
    containerClassName?: string
}

export function Input({
    label,
    hint,
    error,
    leftIcon,
    containerClassName,
    onFocus,
    onBlur,
    ...rest
}: InputProps) {
    const [focused, setFocused] = useState(false)

    return (
        <View className="gap-2">
            {label ? (
                <Text
                    className={cn(
                        typography.classes.label,
                        'text-[11px] uppercase tracking-[1.8px] text-text-muted'
                    )}
                >
                    {label}
                </Text>
            ) : null}

            <View
                className={cn(
                    'min-h-14 flex-row items-center gap-3 rounded-[20px] bg-surface-highest px-4',
                    focused && 'bg-surface-card',
                    error && 'bg-danger-100',
                    containerClassName
                )}
            >
                {leftIcon}
                <TextInput
                    className={cn(
                        typography.classes.bodyMedium,
                        'flex-1 py-4 text-base text-text-primary'
                    )}
                    onBlur={(event) => {
                        setFocused(false)
                        onBlur?.(event)
                    }}
                    onFocus={(event) => {
                        setFocused(true)
                        onFocus?.(event)
                    }}
                    placeholderTextColor={colors.text.muted}
                    {...rest}
                />
            </View>

            {error ? (
                <Text className={cn(typography.classes.bodyMedium, 'text-sm text-danger-500')}>
                    {error}
                </Text>
            ) : hint ? (
                <Text className={cn(typography.classes.bodyMedium, 'text-sm text-text-secondary')}>
                    {hint}
                </Text>
            ) : null}
        </View>
    )
}
