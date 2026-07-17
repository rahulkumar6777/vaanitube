import mongoose from 'mongoose';

const channelMemberschema = new mongoose.Schema({
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
        index: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    isMember: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });


channelMemberschema.index(
    { channelId: 1, userId: 1 },
    { unique: true }
);

export const ChannelMember = mongoose.model("ChannelMember", channelMemberschema)