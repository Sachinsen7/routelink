import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-headline',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
})

export const metadata: Metadata = {
    title: 'RouteLink',
    description: 'The future of inter-city travel and delivery.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${manrope.variable} ${inter.variable}`}>{children}</body>
        </html>
    )
}
