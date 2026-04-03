import { memo } from 'react'
import { Image, Text, View } from 'react-native'

import { typography } from '../../constants/typography'
import { cn } from '../../utils/cn'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeClasses: Record<AvatarSize, string> = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
}

const textClasses: Record<AvatarSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
}

type AvatarProps = {
    name: string
    uri?: string | null
    size?: AvatarSize
    className?: string
}

function AvatarComponent({ name, uri, size = 'md', className }: AvatarProps) {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')

    return (
        <View
            className={cn(
                'items-center justify-center overflow-hidden rounded-[24px] bg-brand-100',
                sizeClasses[size],
                className
            )}
        >
            {uri ? (
                <Image className="h-full w-full" resizeMode="cover" source={{ uri }} />
            ) : (
                <Text
                    className={cn(typography.classes.headline, 'text-brand-900', textClasses[size])}
                >
                    {initials}
                </Text>
            )}
        </View>
    )
}

export const Avatar = memo(AvatarComponent)
