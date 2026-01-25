import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const refreshToken = async (req, res) => {
    try {

        const RefreshToken = req.cookies.RefreshToken;
        if (!RefreshToken) {
            return res.status(401).json({ error: 'No Refresh Token provided' });
        }

        const decoded = jwt.verify(RefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;

        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { refreshToken };