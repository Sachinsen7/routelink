import { Platform, type ViewStyle } from 'react-native'

import { colors } from './colors'

const iosCardShadow: ViewStyle = {
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
}

const iosFloatingShadow: ViewStyle = {
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
}

export const shadows = {
    card:
        Platform.select<ViewStyle>({
            ios: iosCardShadow,
            android: { elevation: 2 },
            default: {},
        }) ?? {},
    floating:
        Platform.select<ViewStyle>({
            ios: iosFloatingShadow,
            android: { elevation: 10 },
            default: {},
        }) ?? {},
}
