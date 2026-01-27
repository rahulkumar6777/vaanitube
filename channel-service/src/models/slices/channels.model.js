import mongoose from 'mongoose';

const channelschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    channelUsername: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    channelAvatar: {
        type: String,
        required: false,
    },
    channelAvatarId: {
        type: String,
        required: false,
    },
    channelBannerId: {
        type: String,
        required: false,
    },
    channelBanner: {
        type: String,
        required: false,
    },
    ownerId: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    totalSubscribers: {
        type: Number,
        default: 0,
    },
    totalvideos: {
        type: Number,
        default: 0,
    },
    totalViews: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'suspended'],
        required: true
    },
    planId: {
        type: String,
        default: null
    },
    activatedAt: {
        type: Date,
        default: null
    }
})

export const Channel = mongoose.model('Channel', channelschema);