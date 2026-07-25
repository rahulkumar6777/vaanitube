import { returnError } from "../../../utils/errors/errorHandler.js";
import { validationResult } from 'express-validator';
import { initChannelPaymentService, verifyChannelPaymentService } from "../services/createChannel.service.js";


export const initChannelPaymentController = async (req, res) => {
    try {

        if (req.user.role !== 'creator') {
            return res.status(400).json({
                message: "You are not Eligible to create Channel"
            })
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        const { order, amount, plan, months } = await initChannelPaymentService(req);

        return res.status(201).json({
            success: true,
            message: 'Payment order created',
            id: order.id,
            orderId: order.id,
            amount,
            currency: order.currency || 'INR',
            plan,
            months,
        });


    } catch (error) {
        returnError(res, error)
    }
}


export const verifyChannelPaymentController = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        const channelId = await verifyChannelPaymentService(req);

        return res.status(201).json({
            message: "channel Created SuccessFully",
            success: true,
            channelId
        })

    } catch (error) {
        returnError(res, error)
    }
}