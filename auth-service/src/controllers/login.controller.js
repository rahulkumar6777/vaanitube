import { body, validationResult } from 'express-validator';
import { Model } from '../models/index.js';
import { GenerateAccessTokenAndRefreshToken } from '../utils/generateaccesstokenandrefreshtoken.js';
import { AccesstokenOption, RefreshtokenOption } from '../utils/option.js';


const loginValidate = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
]

const login = async (req, res) => {
    try {
        await Promise.all(loginValidate.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { username, password } = req.body;

        const user = await Model.User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await user.checkpassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { AccessToken, RefreshToken } = await GenerateAccessTokenAndRefreshToken(user._id);

        return res.status(200)
            .cookie('RefreshToken', RefreshToken, RefreshtokenOption)
            .cookie('AccessToken', AccessToken, AccesstokenOption)
            .json({ message: 'Login successful' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { login };