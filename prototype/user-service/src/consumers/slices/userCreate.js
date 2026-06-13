import { Model } from "../../models/index.js";


export const processUserData = async (data) => {
    try {
        const user = new Model.User({
            userid: data._id,
            role: data.role,
            username: data.username,
            fullname: data.fullname,
            email: data.email,
        });
        await user.save({validateBeforeSave: false});

        console.log('User profile created successfully');
    } catch (error) {
        console.error('Error creating user profile:', error);
    }
};