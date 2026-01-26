import { User } from "../../models/user.model.js";

export const updateUserRefreshTOken =async (data) => {
    try {
        const { refreshToken } = data;

        await User.updateOne(
            { userid: data._id },
            { $set: { refreshToken: refreshToken } }
        );
    } catch (error) {
       throw error; 
    }
}