import { client } from "../configs/redis.js";

export const channelValidate = async (channelId,) => {
    try {
        // check channel is valid or not
        const channelExists = await client.sIsMember(`channel:exist`, channelId.toString());
        if (channelExists === 1) {
            return true;
        }
        if (!channelExists) {

            // here i check from other microservice if not cache not exists
            const response = await fetch(`${process.env.CHANNEL_API}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-internal-secret": process.env.INTERNAL_SECRET,
                }
            });

            if (response.status !== 200) {
                return false;
            }


            await client.sAdd("channel:exist", channelId.toString());
            return true;
        }
    } catch (error) {
        return false;
    }
}