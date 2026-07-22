import { AppError } from "../../../utils/errors/AppError.js";
import { User } from "../models/user.model.js";


export const loginService = async (req) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Invalid Credentials', 404)
    }

    if (user.status !== 'active') {
        throw new AppError('Your Id is not Active', 403)
    }

    if (user.role === "creator" && user.status !== 'active') {
        throw new AppError('Your Id not Verify by your team. verification is under Process', 403)
    }

    const verifyPassword = await user.checkpassword(password);

    if (!verifyPassword) {
        throw new AppError('Invalid Credentials', 401);
    };

    return user;

}