import { Model } from "../../models/index.js";
import { client } from "../configs/redis.js";
import { channelValidate } from '../../utils/channelValidate.js';

const channelUnsubscribe = async (req, res) => {
    try {
        const user = req.user;
        const channelId = req.params.channelId;

        // here i validate channel id 
        const response = await channelValidate(channelId);
        if (!response) {
            return res.status(404).json({
                error: "invalid channelId"
            })
        }

        // check user subscriberd or not in redis
        const result = await client.sIsMember(`channel:${channelId}:subscribers`, user._id);
        if (result === 1) {
            await client.sRem(`channel:${channelId}:subscribers`, user._id);
            await client.sRem(`user:${user._id}:subscriptions`, channelId);
        }


        const unch = await Model.ChannelSubscriber.findOneAndDelete({ userId: user._id, channelId: channelId });
        if (!unch) {
            return res.status(400).json({
                message: "You not subscriber this channel"
            })
        }

        await client.decr(`channel:${channelId}:subscriberCount`);
        // send response
        return res.json({ message: "unSubscribed Successfully" });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export { channelUnsubscribe }