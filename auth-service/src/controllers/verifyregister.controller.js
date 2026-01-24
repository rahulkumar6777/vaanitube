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

        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export { verifyRegister };