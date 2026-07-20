import { body } from 'express-validator';

export const initRegisterValidator = [
    body('fullName')
        .notEmpty()
        .withMessage('fullname is required')
        .isString()
        .withMessage('fullName must be a string')
        .isLength({ min: 3, max: 30 })
        .withMessage("fullname length between 3 to 30"),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email formet'),
    body('phoneno')
        .notEmpty()
        .withMessage('phoneNO is required')
        .isMobilePhone('any', { strictMode: true })
        .withMessage('Invalid phone no , enter phone no with country code'),
    body('age')
        .notEmpty()
        .withMessage("age is required")
        .isInt({ min: 10, max: 120 })
        .withMessage('Age must be between 10 to 120')
        .toFloat(),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isString()
        .withMessage("password must be a String")
        .isLength({ min: 8, max: 30 })
        .withMessage("password length between 6 to 30")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .withMessage(
            "Password must be characters and include uppercase, lowercase, number, and special character"
        )
]

export const verifyRegisterViewerValidator = [
    body("otp")
        .notEmpty()
        .withMessage("otp is required")
        .isLength({ min: 6, max: 6 })
        .withMessage("otp must be six digit"),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email formet'),
]
