import { ChannelSubscriber } from "../models/channelSubscriber.model.js";
import { client } from "../configs/redis.js";
import { channelValidate } from "../utils/channelValidate.js";


const channelUnsubscribe = async (req, res) => {
    try {
        const user = req.user;
        const channelId = req.params.channelId;

        // check channel is valid or not
        const response = await channelValidate(channelId);
        if (!response) {
            return res.status(500).json({
                error: "invalid channelId"
            })
        }

        // check user subscriberd or not in redis
        const result = await client.sismember(`channel:${channelId}:subscribers`, user._id);
        if (result === 1) {
            await client.srem(`channel:${channelId}:subscribers`, user._id);
            await client.srem(`user:${user._id}:subscriptions`, channelId);
        }


        const unch = await ChannelSubscriber.findOneAndDelete({ userId: user._id, channelId: channelId });
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