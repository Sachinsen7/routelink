export const navLinks = [
    { href: '#how-it-works', label: 'How it works' },
    { href: '#features', label: 'Features' },
    { href: '#trust', label: 'Trust & Safety' },
]

import heroImageSrc from '@/assets/screen.png'
import showcaseImageSrc1 from '@/assets/screen1.png'
import showcaseImageSrc2 from '@/assets/screen3.png'


export const heroAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBVk6j7jm_2BfYvtZ2waURHrSyaGaoa4L4RSw_dOcfTTpFjlUfCL39juYCE5hO5WskhKc-1deOIXMre3HQmHdP9e2gdYyTGolPmlzxefnOmd5mAtC9B3PB80c9sSocBd2fkEFHUeLg0ScBg5CZ6kEg2xpe-l5LbZsvzNULxi_octbEiWUTSqSwzVYTJAcAHxZujD4TkkjxdgJ8NQLaDbuiz_uIr4G7FOaCS7DEsmWSqvMEEeyMh_xftkwmwFSCSzAOWtLlEW4K_CJw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHlrtnlQZL5MVOfP0UoV6CDw3mE0CM7yTsWTG7ds3mHMWj3Uia8DE01lPL8SXtJshL5U83o5XvJ3qG7lznHToyD9vWL_-ImUurj1x1z088VzMzSun-iYJia45ASFwVSYfA2WLF3c2JAtGlYvkyburKnZm8VFlhIvy51c9yHb6ubStKix0msEh8E_5JheJwVBQWMZ07kIXDIGsxAt6QfFSZHu9NR8gFX1LBIYmH4SoxHKWHcGZitESk20sFmkZThtZyvi9doD047nM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDctcXx7eADaCrKtwW6FR3Wk61tg75Cqu8YkKguyxfH-fOCAGJkBavAicUxeyjf0eawIIWM9EAosTesh_V0_aRNMCW1ve0RGyRop3TzKcKZ2LlYm-jAJm8O-3Jty9XSqczGBTC821qN5SFhBITlCyqMbdt0f_D0HR28jld-vybO-n2HK5cb1X452LLlWC1QpLc87KjKxiWTLYe7pxOOTT1lU3JQQZd8WhOnJ1Gbk7o0sftvmUnIccCfcOgSZj9uKCTRVqk_65KbPFs',
]

export const showcaseImages = [
    showcaseImageSrc1.src,
    showcaseImageSrc2.src,

]

export const heroImage = heroImageSrc.src

export const trustImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBu8g797NU0tB_UIzh0SPeyFhuL0hPMDsrprsNLmKIB95GAf8fFZjxjLfp9eaqus8Feq1j7LCJ_Y8QtpglfZ2aA1XG_UbxIMtO0nhGD5jpZCg1bGps8mBZxdJge8M4bO-2Lrzm-uAn8I-ZILqTnpnZv2E76eWd1QT_Snh9hDw0gzmDiqwRaPtPofMF_9XDYmlRkPldX1GxFdCycUdIUBNmxLyoPD1FBYzymXCvFABG8x0VtfG3P00ll1hJbuq5lLB1hDI7uqMv1004'

export const features = [
    {
        eyebrow: 'For Travelers',
        title: 'Share Routes',
        description:
            'Traveling from Mumbai to Pune? Post your route and carry small packages to offset your travel costs instantly.',
        tone: 'gradient',
        icon: 'route',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7tzGSnbGxRwX28nuFN3G6xOPQmUMNUSHrCXhZvXimpBaVilTVJmZrBRHekfHEG11MzlaU0hgxvrmiU_JHvy-ICxXpDR1tfKtX0Mg0yaPowL3jHqLYi8V4Rn5mCRiGeu0wCZ5eNkoQhuuHlSCeo6iaixuGzuWIip4sL9pIBD_yEX0T80m4q3aLhw4NRtW8jqMFSIdcjZpZxFq9TT4DFuDnR98uqBhB-Kr0V8SgDy3gKqa7LfY_ZD6ADJxoeh5hIobkfof_OyduQko',
        alt: 'RouteLink tracking interface with active travel route',
        stats: ['2 mins to post a route', 'Verified handoff flow', 'Live route coordination'],
    },
    {
        eyebrow: 'For Senders',
        title: 'Carry Packages',
        description:
            'Need something delivered fast? Match with someone already heading that way for same-day delivery at half the cost.',
        tone: 'secondary',
        icon: 'package',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi5IrZCWPBE5fexHyquPLTc3HJUmAqTQSMd_Hec3u4K8cQQiVFuh6w0V12kBGpL3DaA4D0vTLM6uTTD-KwGDHVsKXzNnfddd_y5tN5nil4uewbK8ImtaYDv1dr7Rm5X4Lj6my3qwpVg21chz6Dkx7TqFQ0Vvon1mdNJ3ScV66nONsX53UEH6R8NNS3_xwKi-WnPWkPBmNFzh6omF3R4mgygSMnYVogGEqwXzMXfEwmmOmnN2yUDWvFEcZx9WJVCbdmdQ2SM7nxrEM',
        alt: 'RouteLink package requests and pricing interface',
        stats: ['Same-day inter-city options', 'Half the courier cost', 'Cleaner booking flow'],
    },
    {
        eyebrow: 'Trust Layer',
        title: 'Real-time Trust',
        description:
            'Identity verification through DigiLocker and real-time tracking ensures your items are always in safe hands.',
        tone: 'accent',
        icon: 'shield',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkty9rQXQxWn2GyI8XXPs2ZA5cqlkQwzzS5o0gxXIfzrgMeX4N0RFUiOu7nuoDRQdbVsZeLBiP1hssXHjvNQK1dSzlzPN5WfPTjZAwPb7OsLOOHtqmb-HOc0sztHaEz1LC4XDQD12qGEg3CyX3wWdSeYlQPIPQjVTU_n7VanGCtQckYPhSTf4binG3J0NcEFUPIuOXPlKzt2cdLY3Yvqeion1d5OhGDZqGbC-bA927UCsc6xMJMDBc9_s5XRwjTa7uMyHl8j98pD4',
        alt: 'RouteLink verified profile and trust indicators',
        stats: ['DigiLocker backed identity', 'Transit-safe matching', 'End-to-end visibility'],
    },
]

export const steps = [
    {
        number: '1',
        title: 'Post',
        description:
            "Whether you're a sender or a traveler, list your request or route in seconds.",
    },
    {
        number: '2',
        title: 'Match',
        description:
            'Our smart algorithm finds the most efficient peer for your route automatically.',
    },
    {
        number: '3',
        title: 'Deliver',
        description:
            'Track in real-time and complete the task securely with OTP-based verification.',
    },
]

export const trustPoints = [
    {
        title: 'DigiLocker Verified',
        description:
            'All users undergo mandatory government-backed ID verification before their first trip.',
        icon: 'fingerprint',
    },
    {
        title: 'Transit Insurance',
        description:
            'Every package delivered through RouteLink is covered by premium transit insurance.',
        icon: 'shield',
    },
]

export const footerLinks = [
    { href: '#how-it-works', label: 'How it works' },
    { href: '#trust', label: 'Trust & Safety' },
    { href: '#download', label: 'Download' },
    { href: '#', label: 'Privacy' },
    { href: '#', label: 'Terms' },
]
