import { body } from 'express-validator';

export const initRegisterValidator = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('fullname is required')
        .isString()
        .withMessage('fullName must be a string')
        .isLength({ min: 3, max: 30 })
        .withMessage("fullname length between 3 to 30"),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email formet'),
    body('phoneno')
        .trim()
        .notEmpty()
        .withMessage('phoneNO is required')
        .isMobilePhone('any', { strictMode: true })
        .withMessage('Invalid phone no , enter phone no with country code'),
    body('age')
        .notEmpty()
        .withMessage("age is required")
        .isInt({ min: 10, max: 120 })
        .withMessage('Age must be between 10 to 120')
        .isLength({ max: 255 })
        .withMessage("Email is too long")
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
        .trim()
        .notEmpty()
        .withMessage("otp is required")
        .isLength({ min: 6, max: 6 })
        .withMessage("otp must be six digit"),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email formet'),
]


export const initRegisterCreatorValidation = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("fullName is Reqired")
        .isLength({ min: 3, max: 30 })
        .withMessage("fullname length between 3 to 30"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage("Email is too long"),
    body("phoneno")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("any")
        .withMessage("Invalid phone number")
        .isLength({ min: 8, max: 20 })
        .withMessage("Phone number must be between 8 and 20 characters"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 64 })
        .withMessage("Password must be between 8 and 64 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).+$/)
        .withMessage(
            "Password must contain uppercase, lowercase, number and special character"
        ),
    body("age")
        .notEmpty()
        .withMessage("Age is required")
        .isInt({ min: 18, max: 120 })
        .withMessage("Age must be between 18 and 120"),
    body("verificationType")
        .trim()
        .notEmpty()
        .withMessage("Verification type is required")
        .isIn([
            "pan",
            "aadhaar",
        ])
        .withMessage("Invalid verification type"),
    body("verificationValue").custom((value, { req }) => {
        switch (req.body.verificationType) {
            case "pan":
                if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())) {
                    throw new Error("Invalid PAN number");
                }
                break;

            case "aadhaar":
                if (!/^\d{12}$/.test(value)) {
                    throw new Error("Aadhaar must contain exactly 12 digits");
                }
                break;
        }

        return true;
    }),
    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")
        .isLength({ min: 10, max: 500 })
        .withMessage("Address must be between 10 and 500 characters"),
];
