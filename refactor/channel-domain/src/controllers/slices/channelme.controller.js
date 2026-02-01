import { Model } from "../../models/index.js";
import { client } from "../configs/redis.js";

const channelMe = async (req, res) => {
    try {
        const userId = req.user._id;


        const channelIds = await client.sMembers(
            `user:${userId}:subscriptions`
        );

        if (channelIds.length > 0) {
            return res.status(200).json({
                message: "success",
                data: channelIds,
                source: "cache"
            });
        }


        const subscriptions = await Model.ChannelSubscriber.find(
            { userId },
            { channelId: 1, _id: 0 }
        );

        const ids = subscriptions.map(s => s.channelId);


        if (ids.length > 0) {
            await client.sAdd(`user:${userId}:subscriptions`, ids);
        }

        return res.status(200).json({
            message: "success",
            data: ids,
            source: "db"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export { channelMe };
