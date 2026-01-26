import { Model } from '../../models/index.js'
import { uploadToDevload } from '../../utils/devload.upload.js';

const ProfileChange = async (req, res) => {
    try {
        const { userid } = req.user;

        const localFilePath = req.file?.path;

        const uploadResponse = await uploadToDevload(localFilePath);
        if (!uploadResponse) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const updatedUser = await Model.User.findOneAndUpdate(
            { userid },
            { profilepic: uploadResponse.publicUrl , profilefileid: uploadResponse.fileid },
            { new: true }
        );

        return res.status(200).json({
            message: "Profile picture updated successfully",
            profilepic: updatedUser.profilepic,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { ProfileChange }