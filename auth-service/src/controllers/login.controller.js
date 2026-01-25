import { body, validationResult } from 'express-validator';


const loginValidate = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
]

const login = async (req, res) => {
    try {
        await Promise.all(loginValidate.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { username, password } = req.body;
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { login };