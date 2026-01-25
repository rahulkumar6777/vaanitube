import { Model } from "../models/index.js";

const GenerateAccessTokenAndRefreshToken = async function (id) {
    try {
        const user = await Model.User.findById(id);
        if (!user) throw new Error("User not found");

        const AccessToken = await user.generateAccessToken();
        const RefreshToken = await user.generateRefreshToken();

        return { AccessToken, RefreshToken };
    } catch (error) {
        console.log("Error while creating token:", error);
        return null;
    }
};

export { GenerateAccessTokenAndRefreshToken };
