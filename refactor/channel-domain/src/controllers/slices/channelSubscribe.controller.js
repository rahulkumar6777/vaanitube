import { Model } from '../../models/index.js'
import { client } from "../configs/redis.js";
import { channelValidate } from '../../utils/channelValidate.js';

const channelSubscribe = async (req, res) => {
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
        if (response.ownerId === user._id) {
            return res.status(400).json({
                error: "you can't subscriber own channel"
            })
        }


        const result = await client.sIsMember(`channel:${channelId}:subscribers`, user._id);
        if (result === 1) {
            return res.status(409).json({
                message: "already subscribed"
            })
        }


        if (!result) {
            const alreadySubscribed = await Model.ChannelSubscriber.exists({
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
        const ch = await Model.ChannelSubscriber.create({ channelId: channelId, userId: user._id });


        await client.sAdd(`channel:${channelId}:subscribers`, user._id);
        await client.sAdd(`user:${user._id}:subscriptions`, channelId);
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