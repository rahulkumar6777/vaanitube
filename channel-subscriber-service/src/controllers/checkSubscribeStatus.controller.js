import { client } from "../configs/redis.js";
import { ChannelSubscriber } from "../models/channelSubscriber.model.js";
import { channelValidate } from "../utils/channelValidate.js";


const checkSubscribeStatus = async (req, res) => {
    try {

        const channelId = req.params.channelId;

        const response = await channelValidate(channelId);
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "invalid channelId"
            })
        }

        const sismember = await client.sIsMember(`channel:${channelId}:subscribers`, userId);
        if (sismember === 1) {
            return res.status(200).json({
                success: true
            })
        }

        const exist = await ChannelSubscriber.find({ channelId: channelId, userId: req.user._id })
        if (!exist) {
            return res.status(404).json({
                success: false
            })
        }

        await client.sAdd(`channel:${channelId}:subscribers`, req.user._id);
        await client.sAdd(`user:${req.user._id}:subscriptions`, channelId);


        return res.status(200).json({
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export { checkSubscribeStatus }