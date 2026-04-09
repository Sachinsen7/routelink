export const navLinks = [
    { href: '#how-it-works', label: 'How it works' },
    { href: '#features', label: 'Features' },
    { href: '#trust', label: 'Trust & Safety' },
]

import heroImageSrc from '@/assets/screen.png'
import showcaseImageSrc1 from '@/assets/screen1.png'
import showcaseImageSrc2 from '@/assets/screen3.png'
import featureImageSrc1 from '@/assets/screen4.png'
import featureImageSrc2 from '@/assets/screen5.png'
import featureImageSrc3 from '@/assets/screen6.png'


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
        image: featureImageSrc1.src,
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
        image: featureImageSrc2.src,
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
        image: featureImageSrc3.src,
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
