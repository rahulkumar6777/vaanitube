import { AppError } from "../../../utils/errors/AppError.js";
import crypto from 'crypto';
import { envs } from "../../../lib/env.js";
import { generateSixDigitCode } from "../../../utils/generateSixDigitCode.js";
import { getRedis } from "../../../config/redis/redis.js";
import { redisCachingKey } from "../../../utils/cache/rediskeys.js";
import { transporter } from "../../../utils/mail/transporter.js";
import { User } from '../models/user.model.js';
import { getLocationFromIP } from "../../../utils/getLocationFromIP.js";



export const initRegisterViewer = async (req) => {

    const redis = getRedis();

    const { fullName, email, phoneno, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {

        if (existingUser.status === 'pending') {
            throw new AppError('Registration Already initiated', 400)
        }

        throw new AppError('User Already exists With this email', 409)
    }

    const REGISTRATION_EXPIRY_MS = 10 * 60 * 1000;
    const getRegistrationExpiry = () => new Date(Date.now() + REGISTRATION_EXPIRY_MS);
    const otp = generateSixDigitCode();

    const generateUsername = (fullName) => {
        const cleanName = fullName.toLowerCase().trim().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
        const randomPart = crypto.randomBytes(6).toString("hex");
        return `${cleanName}${randomPart}`;
    };

    const newUser = new User({
        fullname: fullName,
        email: email,
        password: password,
        role: "viewer"
    });

    // fetch country and state by ip
    const { country, state } = await getLocationFromIP(req.ip)

    const redisKey = redisCachingKey.UserOtp(newUser.email);
    redis.hset(redisKey, {
        email: newUser.email,
        otp: otp
    });
    redis.expire(redisKey, 600);

    await transporter.sendMail({
        from: `"VaaniTube" <${envs.EMAIL_USER}>`,
        to: newUser.email,
        subject: 'Your Registration Otp',
        text: `Your Registration otp is ${otp}`
    });

    newUser.registrationExpiresAt = getRegistrationExpiry();
    newUser.username = generateUsername(newUser.fullname);
    newUser.country = country;
    newUser.state = state
    await newUser.save({ validateBeforeSave: false });

    return;
}