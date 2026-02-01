import mongoose from "mongoose";

const channelSubscriberSchema = new mongoose.Schema({
    channelId: {
        type: String,
        required: true,
        index: true,
    },
    userId: {
        type: String,
        required: true,
        index: true,
    },
}, {
    timestamps: true
});

channelSubscriberSchema.index({ channelId: 1, userId: 1 }, { unique: true });

export const ChannelSubscriber = mongoose.model("ChannelSubscriber", channelSubscriberSchema);