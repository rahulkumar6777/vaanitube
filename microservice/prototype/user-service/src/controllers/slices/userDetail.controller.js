import { Model } from "../../models/index.js";

const userDetail = async (req, res) => {
    try {
        const userid = req.user._id;

        const userdetail = await Model.User.findOne({ userid })

        if (!userdetail) {
            return res.status(404).json({
                message: "Invalid User"
            })
        }

        return res.status(200).json({
            message: "success",
            data: userDetail
        })


    } catch (error) {
        return res.status(500).json({
            error: "internal server Error"
        })
    }
}

export { userDetail }