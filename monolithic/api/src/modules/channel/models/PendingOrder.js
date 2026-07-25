import mongoose from "mongoose";

const pendingorderschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    months: {
        type: Number,
        required: true,
        min: 1
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    plan: {
        type: String,
        enum: ["starter", "growth", "unlimited"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
        index: true
    },
    createdAt: {
        type: Date,
        expires: 7200,
        default: Date.now
    }
})

export const PendingOrder = mongoose.model('PendingOrder', pendingorderschema)
