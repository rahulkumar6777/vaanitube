import { Model } from "../../models/index.js"
import { client } from "../../configs/redis.js";

export const joinChannelMemberShip = async (data) => {
    try {
        await Model.ChannelMember.create({
            channelId: data.channelId,
            userId: data.userId,
            isMember: true
        });

        await client.sAdd(`channel:${channelId}:members`, user._id);
        await client.sAdd(`user:${user._id}:membership`, channelId);
        return true;
    } catch (error) {
        throw error
    }
}