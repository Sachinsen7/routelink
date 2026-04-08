import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type SharedProps = {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'dark'
    icon?: ReactNode
}

type ButtonProps =
    | (SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })

export function SiteButton({
    children,
    variant = 'primary',
    icon,
    className,
    ...props
}: ButtonProps) {
    const classes = ['site-button', `site-button--${variant}`, className].filter(Boolean).join(' ')
    const content = (
        <>
            <span>{children}</span>
            {icon}
        </>
    )

    if ('href' in props && props.href) {
        return (
            <a className={classes} {...props}>
                {content}
            </a>
        )
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>

    return (
        <button className={classes} {...buttonProps} type={buttonProps.type ?? 'button'}>
            {content}
        </button>
    )
}
