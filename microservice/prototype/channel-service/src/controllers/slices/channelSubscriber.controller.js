import { client } from "../configs/redis.js";
import { Model } from "../../models/index.js";
import { channelValidate } from '../../utils/channelValidate.js';

const getSubscriberCount = async (req, res) => {
    const channelId = req.params.channelId;

    // here i validate channel id 
    const response = await channelValidate(channelId);
    if (!response) {
        return res.status(404).json({
            error: "invalid channelId"
        })
    }


    const key = `channel:${channelId}:subscriberCount`;

    let count = await client.get(key);

    if (count === null) {
        // Redis lost data then rebuild from DB
        count = await Model.ChannelSubscriber.countDocuments({ channelId });
        await client.set(key, count);
    }

    return res.status(200).json({
        message: "Success",
        ChannelSubscriber: Number(count)
    })
};

export { getSubscriberCount }
