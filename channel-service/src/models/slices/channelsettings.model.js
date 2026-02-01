import mongoose from 'mongoose';

const channelSettingsSchema = new mongoose.Schema({
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
        unique: true,
        index: true,
    },
    allowSubscriptions: {
        type: Boolean,
        default: true,
    },
    showSubscriberCount: {
        type: Boolean,
        default: true
    },
});

export const ChannelSetting = mongoose.model('ChannelSetting', channelSettingsSchema);