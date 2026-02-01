import { Model } from '../../models/index.js'
import { client } from "../configs/redis.js";


const channelSubscribe = async (req, res) => {
    try {
        const user = req.user;
        const channelId = req.params.channelId;

        // firct check on chache if not exist then check on fall on db
        const validateChannel = await client.hGetAll(`channel:${channelId}`);

        if (!validateChannel) {
            const response = await Model.channel.findById(channelId);
            if (!response || response.ownerId === user._id) {
                return res.status(404).json({
                    error: "invalid channelId or you can't subscriber own channel"
                })
            }

            await client.hSet(
                `channel:exist:${newChannel._id.toString()}`,
                {
                    ownerId: newChannel.ownerId.toString(),
                }
            );
        }

        if (validateChannel.ownerId === user._id.toString()) {
            return res.status(404).json({
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