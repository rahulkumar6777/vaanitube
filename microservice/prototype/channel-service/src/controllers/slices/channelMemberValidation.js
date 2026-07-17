import { client } from "../../configs/redis.js";
import { Model } from "../../models/index.js";

const ChannelMemberValidation = async (req, res) => {
    try {
        const userId = req.user._id || req.body.userId;
        const channelId = req.params.channelId;

        const member = await Model.ChannelMember.exists({ channelId: channelId, userId: userId });

        if (!member) {
            return res.status(404).json({
                message: "not channel member",
                success: false
            })
        };

        if (member) {
            const sismember = await client.sIsMember(`channel:${channelId}:members`, userId);
            if (!sismember) {
                await client.sAdd(`channel:${channelId}:members`, user._id);
            }
        }

        return res.status(200).json({
            message: "you are member",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            success: false
        })
    }
}

export { ChannelMemberValidation }