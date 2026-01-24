import { User } from "../../models/user.model.js";


export const processUserData = async (data) => {
    try {
        const user = new User({
            userid: data._id,
            status: data.status,
            role: data.role,
        });
        await user.save({validateBeforeSave: false});

        console.log('User profile created successfully');
    } catch (error) {
        console.error('Error creating user profile:', error);
    }
};