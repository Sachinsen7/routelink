import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { TopBar } from '../components/ui/TopBar'
import { media } from '../constants/media'
import { typography } from '../constants/typography'
import { useProfileStore } from '../store/profileStore'
import { useSessionStore } from '../store/sessionStore'
import { cn } from '../utils/cn'
import type { RootStackParamList } from '../navigation/types'

export function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { profile, loadProfile, saveProfile, saving } = useProfileStore()
    const logout = useSessionStore((state) => state.logout)
    const [draftName, setDraftName] = useState('')
    const [draftBio, setDraftBio] = useState('')

    useFocusEffect(
        useCallback(() => {
            loadProfile()
        }, [loadProfile])
    )

    const name = profile?.name || 'RouteLink User'
    const bio =
        profile?.bio ||
        'Regular traveler between Bangalore and Mumbai. Helping peers move packages safely and efficiently.'

    return (
        <SafeAreaView className="flex-1 bg-surface-base" edges={['top']}>
            <TopBar
                brand
                rightSlot={
                    <Ionicons
                        color="#767586"
                        name="notifications-outline"
                        onPress={() => navigation.navigate('Notifications')}
                        size={22}
                    />
                }
                title="RouteLink"
            />

            <ScrollView
                contentContainerClassName="gap-8 px-6 pb-32 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center gap-6">
                    <Image className="h-36 w-36 rounded-[32px]" source={{ uri: media.profile }} />
                    <View className="items-center gap-2">
                        <Text
                            className={cn(
                                typography.classes.display,
                                'text-[32px] text-text-primary'
                            )}
                        >
                            {name}
                        </Text>
                        <Text
                            className={cn(
                                typography.classes.bodyMedium,
                                'text-center text-base leading-7 text-text-secondary'
                            )}
                        >
                            {bio}
                        </Text>
                    </View>

                    <View className="w-full flex-row gap-4">
                        <Card className="flex-1 items-center bg-surface-card py-6">
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'text-3xl text-text-primary'
                                )}
                            >
                                {profile?.reviewsCount || 88}
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'mt-1 text-sm text-text-secondary'
                                )}
                            >
                                Reviews
                            </Text>
                        </Card>
                        <Card className="flex-1 items-center bg-surface-card py-6">
                            <Text
                                className={cn(
                                    typography.classes.display,
                                    'text-3xl text-text-primary'
                                )}
                            >
                                {Math.round(profile?.trustScore || 95)}%
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'mt-1 text-sm text-text-secondary'
                                )}
                            >
                                Verified
                            </Text>
                        </Card>
                    </View>
                </View>

                <View className="gap-4">
                    <Text
                        className={cn(
                            typography.classes.label,
                            'text-xs uppercase tracking-[2px] text-text-muted'
                        )}
                    >
                        Identity verifications
                    </Text>
                    <View className="flex-row flex-wrap gap-3">
                        <Badge label="Phone verified" variant="brand" />
                        <Badge label="Email ready" variant="secondary" />
                        <Badge label="DigiLocker" variant="brand" />
                    </View>
                </View>

                <Card className="gap-4 bg-surface-card">
                    <Text className={cn(typography.classes.headline, 'text-lg text-text-primary')}>
                        Update profile
                    </Text>
                    <Input
                        label="Full Name"
                        onChangeText={setDraftName}
                        placeholder={name}
                        value={draftName}
                    />
                    <Input
                        label="Bio"
                        multiline
                        onChangeText={setDraftBio}
                        placeholder={bio}
                        value={draftBio}
                    />
                    <Button
                        fullWidth
                        label={saving ? 'Saving...' : 'Save profile'}
                        onPress={() =>
                            saveProfile({
                                name: draftName || name,
                                bio: draftBio || bio,
                                avatarUrl: media.profile,
                            })
                        }
                    />
                </Card>

                <Card className="gap-4 bg-surface-container">
                    <View className="flex-row items-center gap-3">
                        <View className="h-12 w-12 items-center justify-center rounded-pill bg-brand-100">
                            <MaterialCommunityIcons color="#4648D4" name="shield-check" size={24} />
                        </View>
                        <View className="flex-1">
                            <Text
                                className={cn(
                                    typography.classes.headline,
                                    'text-lg text-text-primary'
                                )}
                            >
                                Trust center
                            </Text>
                            <Text
                                className={cn(
                                    typography.classes.bodyMedium,
                                    'mt-1 text-sm leading-6 text-text-secondary'
                                )}
                            >
                                Complete ID verification to unlock premium routes and faster
                                settlements.
                            </Text>
                        </View>
                    </View>
                    <Button
                        fullWidth
                        label="Open verification"
                        onPress={() => navigation.navigate('Verification')}
                        variant="secondary"
                    />
                </Card>

                <Text
                    className={cn(
                        typography.classes.label,
                        'text-center text-xs uppercase tracking-[2px] text-danger-500'
                    )}
                    onPress={logout}
                >
                    Sign out
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}
