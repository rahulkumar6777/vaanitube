import { body } from 'express-validator';

export const initRegisterValidator = [
    body('fullName')
        .notEmpty()
        .withMessage('fullname is required')
        .isString()
        .withMessage('fullName must be a string'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email formet'),
    body('phoneno')
        .notEmpty()
        .withMessage('phoneNO is required')
        .isMobilePhone()
        .withMessage('Invalid phone no'),
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