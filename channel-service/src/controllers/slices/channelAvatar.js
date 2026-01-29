import { Model } from "../../models/index.js"
import { deleteFromDevload } from "../../utils/devload.delete.js";
import { uploadToDevload } from "../../utils/devload.upload.js";
import fs from 'fs'

const channelAvatar = async (req, res) => {
    try {
        const file = req?.file;
        const channelId = req.params
        if (!file) {
            return res.status(400).json({
                message: "file not received"
            })
        }

        const channel = await Model.Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({
                message: "invalid channelid"
            })
        }

        if (channel.channelAvatarId) {
            const res = await deleteFromDevload(channel.channelAvatarId)
            if (!res) {
                fs.unlinkSync(file.path)
            }
        }

        const uploadResponse = await uploadToDevload(file.path);
        if (!uploadResponse) {
            fs.unlinkSync(file.path)
            return res.status(500).json({
                error: "error while uplaoding"
            })
        }

        channel.channelAvatar = uploadResponse.publicUrl;
        channel.channelAvatarId = uploadResponse.fileid;

        await channel.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: "Successfully changed"
        })

    } catch (error) {
        fs.unlinkSync(req.file.path)
        return res.status(500).json({
            error: "internal server Error"
        })
    }
}

export { channelAvatar }