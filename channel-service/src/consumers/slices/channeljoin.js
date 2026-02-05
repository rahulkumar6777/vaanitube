import { Model } from "../../models/index.js"

export const joinChannelMemberShip = async (data) => {
    try {
        await Model.ChannelMember.create({
            channelId: data.channelId,
            userId: data.userId,
            isMember: true
        });
        return true;
    } catch (error) {
        throw error
    }
}