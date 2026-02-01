import { Model } from "../../models/index.js";
import { client } from "../configs/redis.js";


const channelUnsubscribe = async (req, res) => {
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