import { AppError } from '../../../utils/errors/AppError.js';
import { createRazorpayOrder } from '../../../utils/paymentGateway/createRazorpayOrder.js';
import { Channel } from '../models/channel.model.js';
import { ChannelSetting } from '../models/channelSettings.js';
import { PendingOrder } from '../models/PendingOrder.js';
import crypto from "crypto";
import { plans } from "../../../constant/plan.js"
import { envs } from '../../../lib/env.js';
import { CompletedOrder } from '../models/completedOrder.model.js';

const generateChannelUsername = (name) => {
    const cleanName = name.toLowerCase().trim().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    const randomPart = crypto.randomBytes(6).toString("hex");
    return `${cleanName}${randomPart}`;
};


const planAmountInPaise = (price, months) => {
    const amount = Number(price || 0) * months * 100;
    return Math.round(amount);
};

const verifyRazorpaySignature = ({ orderId, paymentId, signature }) => {
    const expectedSignature = crypto
        .createHmac('sha256', envs.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

    if (!signature || signature.length !== expectedSignature.length) {
        return false;
    }

    return crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(signature)
    );
};


const planEndDate = (months) => {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);
    return endDate;
};

export const initChannelPaymentService = async (req) => {

    const { planid, months, channelName } = req.body;
    const billingMonths = Number(months);
    const plan = plans[planid];

    if (!plan) {
        throw new AppError(`Paid project plan must be one of: ${Object.keys(plans).join(', ')}`, 400);
    }

    const amount = planAmountInPaise(plan.price, billingMonths);
    if (amount <= 0) {
        throw new AppError('Payment amount must be greater than zero', 400);
    }

    const channel = new Channel({
        name: channelName,
        channelUsername: generateChannelUsername(channelName),
        ownerId: req.user._id,
        planId: planid
    });

    await channel.save({ validateBeforeSave: false })

    const receipt = `channel_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const order = await createRazorpayOrder({
        amount,
        receipt,
        notes: {
            userId: req.user._id.toString(),
            plan: planid,
            channelId: channel._id,
            paymentFor: "channel_activation"
        }
    });

    await PendingOrder.create({
        amount: amount,
        channelId: channel._id,
        months: billingMonths,
        orderId: order.id,
        plan: planid,
        userId: req.user._id,
        status: "pending",
        createdAt: new Date()
    });


    return {
        order,
        amount,
        channelId: channel._id,
        plan: planid,
        planDisplayName: plan.displayName,
        months: billingMonths,
    };

}

export const verifyChannelPaymentService = async (req) => {

    const {
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
    } = req.body;

    if (!orderId || !paymentId || !signature) {
        throw new AppError('Payment verification payload is incomplete', 400);
    }

    const pendingOrder = await PendingOrder.findOne({
        userId: req.user._id,
        orderId,
        status: 'pending',
    });

    if (!pendingOrder) {
        throw new AppError('Pending payment order not found or already processed', 404);
    }

    if (!verifyRazorpaySignature({ orderId, paymentId, signature })) {
        pendingOrder.status = 'failed';
        await pendingOrder.save();
        throw new AppError('Payment signature verification failed', 400);
    }

    await CompletedOrder.create({
        amount: pendingOrder.amount,
        channelId: pendingOrder.channelId,
        months: pendingOrder.months,
        orderId: pendingOrder.orderId,
        plan: pendingOrder.plan,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        status: "completed",
        userId: pendingOrder.userId,
    });

    const channel = await Channel.findById(pendingOrder.channelId);
    if (!channel) {
        throw new AppError('Channel not found for pending order', 404);
    }

    channel.status = "active";
    channel.planStatus = "active";
    channel.planStartedAt = new Date();
    channel.planExpiresAt = planEndDate(pendingOrder.months);
    channel.paymentId = paymentId;
    await channel.save({ validateBeforeSave: false });

    await ChannelSetting.findOneAndUpdate(
        { channelId: channel._id },
        { $setOnInsert: { channelId: channel._id } },
        { new: true, upsert: true }
    );

    pendingOrder.status = "completed";
    await pendingOrder.save({ validateBeforeSave: false })

    return channel._id;
}
