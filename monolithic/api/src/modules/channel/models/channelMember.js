const channelSubscriptionSchema = new mongoose.Schema({
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "expired", "cancelled"],
        default: "active",
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true });


channelMemberschema.index(
    { channelId: 1, userId: 1 },
    { unique: true }
);

export const ChannelMember = mongoose.model("ChannelMember", channelMemberschema)