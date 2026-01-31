import { ChannelSubscriber } from "../models/channelSubscriber.model.js";
import { client } from "../configs/redis.js";
import { channelValidate } from "../utils/channelValidate.js";


const channelSubscribe = async (req, res) => {
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

        const result = await client.sismember(`channel:${channelId}:subscribers`, user._id);
        if (result === 1) {
            return res.status(409).json({
                message: "already subscribed"
            })
        }


        if (!result) {
            const alreadySubscribed = await ChannelSubscriber.exists({
                channelId,
                userId: user._id
            });

            if (alreadySubscribed) {

                await client.sAdd(`channel:${channelId}:subscribers`, user._id);
                await client.sAdd(`user:${user._id}:subscriptions`, channelId);


                return res.status(409).json({ message: "already subscribed" });
            }
        }


        // Create subscriber
        const ch = await ChannelSubscriber.create({ channelId: channelId, userId: user._id });


        await client.sadd(`channel:${channelId}:subscribers`, user._id);
        await client.sadd(`user:${user._id}:subscriptions`, channelId);
        await client.incr(`channel:${channelId}:subscriberCount`);

        // send response
        return res.json({ message: "subscribed", data: ch });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export { channelSubscribe }