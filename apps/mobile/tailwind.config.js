const designTokens = require('./src/constants/design-tokens.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                brand: designTokens.colors.brand,
                accent: designTokens.colors.accent,
                success: designTokens.colors.success,
                warning: designTokens.colors.warning,
                danger: designTokens.colors.danger,
                neutral: designTokens.colors.neutral,
                surface: designTokens.colors.surface,
                text: designTokens.colors.text,
                stroke: designTokens.colors.stroke,
            },
            spacing: {
                4.5: '18px',
                18: '72px',
            },
            borderRadius: {
                button: '18px',
                card: '22px',
                shell: '28px',
                pill: '999px',
            },
            fontFamily: {
                manrope: ['Manrope_400Regular'],
                'manrope-medium': ['Manrope_500Medium'],
                'manrope-semibold': ['Manrope_600SemiBold'],
                'manrope-bold': ['Manrope_700Bold'],
                'manrope-extrabold': ['Manrope_800ExtraBold'],
                inter: ['Inter_400Regular'],
                'inter-medium': ['Inter_500Medium'],
                'inter-semibold': ['Inter_600SemiBold'],
            },
        },
    },
    plugins: [],
}
