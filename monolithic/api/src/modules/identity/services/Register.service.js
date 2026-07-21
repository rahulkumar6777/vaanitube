import { AppError } from "../../../utils/errors/AppError.js";
import crypto from 'crypto';
import { envs } from "../../../lib/env.js";
import { generateSixDigitCode } from "../../../utils/generateSixDigitCode.js";
import { getRedis } from "../../../config/redis/redis.js";
import { redisCachingKey } from "../../../utils/cache/rediskeys.js";
import { transporter } from "../../../utils/mail/transporter.js";
import { User } from '../models/user.model.js';
import { getLocationFromIP } from "../../../utils/getLocationFromIP.js";
import { uploadOnDevload } from "../../../utils/devload/devload.js";



const generateUsername = (fullName) => {
    const cleanName = fullName.toLowerCase().trim().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    const randomPart = crypto.randomBytes(6).toString("hex");
    return `${cleanName}${randomPart}`;
};

export const initRegisterViewer = async (req) => {

    const redis = getRedis();

    const { fullName, email, phoneno, password, age } = req.body;

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

    const newUser = new User({
        fullname: fullName,
        email: email,
        password: password,
        age,
        phoneNo: phoneno,
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

export const verifyRegisterViewerService = async (req) => {
    const redis = getRedis();

    const { otp, email } = req.body;

    const redisKey = redisCachingKey.UserOtp(email);
    const cachedOtp = await redis.hgetall(redisKey);

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Registration expired. Please register again', 400);
    }

    if (user.status !== 'pending') {
        throw new AppError('Registration cannot be verified for this account', 403);
    }

    if (user.registrationExpiresAt && user.registrationExpiresAt <= new Date()) {
        await User.deleteOne({ _id: user._id, status: "pending" });
        throw new AppError('Registration expired. Please register again', 400);
    }

    if (cachedOtp.otp !== otp) {
        throw new AppError("Invalid or Expired Otp", 400);
    }

    await User.findOneAndUpdate(
        { _id: user._id, status: "pending" },
        {
            $set: { status: "active" },
            $unset: { registrationExpiresAt: "" }
        },
        { returnDocument: "after" }
    );

    await redis.del(redisKey)
}

export const initRegisterCreatorService = async (req) => {

    if (!req.files || req.files.length < 1 || req.files.length > 2) {
        throw new AppError("Upload 1 or 2 verification photos", 400);
    }

    const redis = getRedis();

    const { fullName, email, phoneno, password, age, verificationType, verificationValue, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {

        if (existingUser.status === 'pending') {
            throw new AppError('Registration Already initiated', 400)
        }

        throw new AppError('User Already exists With this email', 409)
    }

    const uploadFileResult = await uploadOnDevload(req.files);
    const verificationPhotos = uploadFileResult.map(file => ({
        fileId: file.fileid,
        publicUrl: file.publicurl
    }));

    const REGISTRATION_EXPIRY_MS = 10 * 60 * 1000;
    const getRegistrationExpiry = () => new Date(Date.now() + REGISTRATION_EXPIRY_MS);
    const otp = generateSixDigitCode();

    const newUser = new User({
        fullname: fullName,
        email: email,
        username: generateUsername(fullName),
        password: password,
        age,
        phoneNo: phoneno,
        role: "creator",
        verificationPhotos,
        verificationType,
        verificationValue,
        address
    });

    // fetch country and state by ip
    const { country, state } = await getLocationFromIP(req.ip)

    await transporter.sendMail({
        from: `"VaaniTube" <${envs.EMAIL_USER}>`,
        to: newUser.email,
        subject: 'Your Registration Otp',
        text: `Your Registration otp is ${otp}`
    });


    const redisKey = redisCachingKey.UserOtp(newUser.email);
    redis.hset(redisKey, {
        email: newUser.email,
        otp: otp
    });
    redis.expire(redisKey, 600);


    newUser.registrationExpiresAt = getRegistrationExpiry();
    newUser.country = country;
    newUser.state = state
    await newUser.save({ validateBeforeSave: false });

    return;
}