import { Model } from "../../models/index.js";

const channelValidation = async (req, res) => {
    try {
        const { channelId } = req.params;
        if (!channelId || typeof channelId !== 'string' || channelId.trim() === '') {
            return res.status(400).json({ message: "Invalid channelId parameter" });
        }

        const checkChannel = await Model.Channel.findById(channelId);
        if (!checkChannel) {
            return res.status(404).json({
                message: "channel not found"
            })
        }

        return res.status(200).json({
            message: "success"
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { channelValidation };