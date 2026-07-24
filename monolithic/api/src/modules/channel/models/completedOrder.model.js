import mongoose from "mongoose";

const completedorderschema = new mongoose.Schema({
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
    razorpayPaymentId: {
        type: String,
        index: true
    },
    razorpaySignature: {
        type: String
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
        enum: ["completed", "refunded", "failed"],
        default: "completed"
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
        index: true
    }
}, { timestamps: true })

export const CompletedOrder = mongoose.model('CompletedOrder', completedorderschema)
