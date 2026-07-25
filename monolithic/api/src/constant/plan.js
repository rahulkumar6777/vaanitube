const starter = {
    id: 'starter',
    displayName: 'Starter',
    price: 499,
    maxVideosPerMonth: 22,
    maxVideoLengthMinutes: 180,
    maxLiveStreamsMonth: 2,
    subscriptionShare: 0.75,
    adShare: 0.50,
    isActive: true
}

const growth = {
    id: 'mid',
    displayName: 'Growth',
    price: 999,
    maxVideosPerMonth: 50,
    maxVideoLengthMinutes: 300,
    maxLiveStreamsMonth: 5,
    subscriptionShare: 0.80,
    adShare: 0.60,
    isActive: true
}

const unlimited = {
    id: 'max',
    displayName: 'Unlimited',
    price: 1999,
    maxVideosPerMonth: -1,
    maxVideoLengthMinutes: -1,
    maxLiveStreamsMonth: -1,
    subscriptionShare: 0.85,
    adShare: 0.70,
    isActive: true
}

export const plans = {
    starter,
    growth,
    unlimited
}