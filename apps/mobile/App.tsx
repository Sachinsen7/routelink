import './global.css'

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter'
import {
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    useFonts,
} from '@expo-google-fonts/manrope'
import { StatusBar } from 'expo-status-bar'

import { AppProviders } from './src/providers/AppProviders'
import { AppNavigator } from './src/navigation/AppNavigator'

export default function App() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <AppProviders>
            <StatusBar style="dark" />
            <AppNavigator />
        </AppProviders>
    )
}
