import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import { Model } from "../../models/index.js";

const registerValidate = [
    body("fullname").notEmpty().withMessage("Fullname is required"),
    body("role")
        .notEmpty()
        .withMessage("role is required")
        .isIn(["creator", "viewer"])
        .withMessage("role must be either creator or viewer"),
    body("username")
        .notEmpty().withMessage("username is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be 3–20 chars long")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, underscores"),
    body("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
        .withMessage(
            "Password must include uppercase, lowercase, number, and special character"
        ),
    body("email")
        .notEmpty().withMessage("email is required")
        .isEmail().normalizeEmail()
        .withMessage("Invalid email format"),
];

const register = async (req, res) => {
    try {
        // Run validation
        await Promise.all(registerValidate.map((validate) => validate.run(req)));

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.array()[0].msg,
            });
        }

        const { fullname, username, password, email, role } = req.body;

        
        const existingTempUser = await Model.TempUser.findOne({ $or: [{ username }, { email }] });
        if (existingTempUser) {
            if (existingTempUser.username === username) {
                return res.status(400).json({ message: "username already taken" });
            }
            if (existingTempUser.email === email) {
                return res.status(400).json({ message: "email already exists" });
            }
        }

        
        const existingUser = await Model.User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: "username already taken" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: "email is already used" });
            }
        }

        // OTP Generator
        const generateCode = () =>
            Math.floor(100000 + Math.random() * 900000).toString();

        const saveCodeToDB = async (email) => {
            const code = generateCode();
            await Model.OtpValidate.findOneAndUpdate(
                { email },
                { code, createdAt: new Date() },
                { upsert: true, new: true }
            );
            return code;
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" });
    }
};

export { register };
