import { media } from '../constants/media'

const travelerNames = [
    'Arjun Mehta',
    'Priya Sharma',
    'Rahul Sen',
    'Neha Iyer',
    'Kabir Khan',
    'Sana Merchant',
]

export function getTravelerPresentation(seed: string) {
    const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const index = hash % travelerNames.length
    const rating = 4.6 + (index % 4) * 0.1

    return {
        name: travelerNames[index],
        rating: Number(rating.toFixed(1)),
        deliveries: 40 + index * 18,
        image: index % 2 === 0 ? media.traveler : media.profile,
    }
}
