import { client } from "../configs/redis";
import { Model } from "../models/index.js";

export const channelValidate = async (channelId) => {
    try {
        // firct check on chache if not exist then check on fall on db
        const response = await client.hGetAll(`channel:${channelId}`);

        if (!validateChannel) {
            const response = await Model.channel.findById(channelId);
            if (!response) {
                return response;
            }

            await client.hSet(
                `channel:exist:${response._id.toString()}`,
                {
                    ownerId: response.ownerId.toString(),
                }
            );
        }

        return response;
    } catch (error) {
        return null
    }
}