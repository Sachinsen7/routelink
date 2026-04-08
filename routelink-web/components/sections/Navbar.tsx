import { navLinks } from '@/lib/site-content'
import { SiteButton } from '@/components/shared/Buttons'

export function Navbar() {
    return (
        <nav className="site-nav">
            <div className="shell site-nav__inner">
                <div className="site-nav__brand">
                    <a className="brand" href="#">
                        Movi
                    </a>
                    <span className="site-nav__status">Available in India</span>
                </div>
                <div className="site-nav__links">
                    {navLinks.map((link) => (
                        <a
                            className={link.label === 'How it works' ? 'is-active' : undefined}
                            href={link.href}
                            key={link.label}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="site-nav__actions">
                    <a className="site-nav__text-link" href="#download">
                        App preview
                    </a>
                    <SiteButton href="#download">Download</SiteButton>
                </div>
            </div>
        </nav>
    )
}
