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
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" });
    }
};

export { register };
