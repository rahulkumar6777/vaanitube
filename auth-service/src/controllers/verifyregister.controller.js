import { body, validationResult } from "express-validator";
import { Model } from "../models/index.js";
import { sendToQueue } from '../config/rabbitmq.config.js';

const verifyRegisterValidate = [
    body('email')
        .notEmpty()
        .withMessage("email is Required")
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid Email Formet"),

    body('otp')
        .notEmpty()
        .withMessage('otp is required')
        .isLength({ min: 6, max: 6 })
        .withMessage('otp length is 6'),
];

const verifyRegister = async (req, res) => {
    try {
        await Promise.all(verifyRegisterValidate.map((v) => v.run(req)));
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.array()[0].msg
            });
        }

        const { otp, email } = req.body;

        // Check OTP 
        const validateOtp = await Model.OtpValidate.findOne({ email });
        if (!validateOtp) {
            return res.status(400).json({ message: "OTP Expired" });
        }

        if (validateOtp.code !== otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        // Check temp user
        const tempUser = await Model.TempUser.findOne({ email });
        if (!tempUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create final user
        const user = new Model.User({
            username: tempUser.username,
            password: tempUser.password,
            email: tempUser.email,
            role: tempUser.role
        });
        await user.save();

        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export { verifyRegister };