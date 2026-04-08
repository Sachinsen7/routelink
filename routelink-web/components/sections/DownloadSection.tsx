import { AppleIcon, GooglePlayIcon } from '@/components/shared/Icons'

export function DownloadSection() {
    return (
        <section className="download-section" id="download">
            <div className="shell">
                <div className="download-card">
                    <div className="download-glow download-glow--right" />
                    <div className="download-glow download-glow--left" />
                    <div className="download-eyebrow">Launch RouteLink</div>
                    <h2>Get Started Today</h2>
                    <p>
                        Join thousands of travelers and senders building India&apos;s most trusted
                        peer-to-peer delivery network with a cleaner, safer mobile experience.
                    </p>
                    <div className="store-buttons">
                        <a className="store-button store-button--apple" href="#">
                            <span className="store-button__icon store-button__icon--apple">
                                <AppleIcon className="icon-xl" />
                            </span>
                            <span className="store-copy">
                                <small>Download on the</small>
                                <strong>App Store</strong>
                            </span>
                        </a>
                        <a className="store-button store-button--play" href="#">
                            <span className="store-button__icon store-button__icon--play">
                                <GooglePlayIcon className="icon-xl" />
                            </span>
                            <span className="store-copy">
                                <small>Get it on</small>
                                <strong>Google Play</strong>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
