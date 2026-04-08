import { DownloadSection } from '@/components/sections/DownloadSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { Footer } from '@/components/sections/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { Navbar } from '@/components/sections/Navbar'
import { ShowcaseSection } from '@/components/sections/ShowcaseSection'
import { TrustSection } from '@/components/sections/TrustSection'

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <ShowcaseSection />
                <HowItWorksSection />
                <TrustSection />
                <DownloadSection />
            </main>
            <Footer />
        </>
    )
}
