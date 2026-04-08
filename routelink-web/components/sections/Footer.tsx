import { footerLinks } from '@/lib/site-content'

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="shell footer-shell">
                <div className="footer-brand">
                    <div className="footer-brand__meta">
                        <a className="brand footer-brand__title" href="#">
                            RouteLink
                        </a>
                        <span className="footer-brand__tag">Inter-city logistics</span>
                    </div>
                    <p>
                        Peer-to-peer delivery designed for trust, speed, and cleaner coordination.
                    </p>
                </div>
                <div className="footer-links">
                    {footerLinks.map((link) => (
                        <a href={link.href} key={link.label}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="shell footer-bottom">
                <p>© 2024 RouteLink Technologies. All rights reserved.</p>
                <a href="#download">Download the app</a>
            </div>
        </footer>
    )
}
