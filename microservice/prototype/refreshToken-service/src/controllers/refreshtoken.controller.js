import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AccesstokenOption } from '../utils/option.js';

const refreshToken = async (req, res) => {
    try {

        const RefreshToken = req.cookies.RefreshToken;
        if (!RefreshToken) {
            return res.status(401).json({ error: 'No Refresh Token provided' });
        }

        const decoded = jwt.verify(RefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;

        const user = await User.findOne({ userid: userId });
        if (!user || user.refreshToken !== RefreshToken) {
            return res.status(403).json({ error: 'Invalid Refresh Token' });
        }

        const newAccessToken = await user.generateAccessToken();

        return res.status(200)
            .cookie('AccessToken', newAccessToken, AccesstokenOption)
            .json({ message: 'Access Token refreshed successfully' });


    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { refreshToken };