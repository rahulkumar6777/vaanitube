import { client } from "../configs/redis.js";
import rateLimit from 'express-rate-limit';


const userBasedRateLimit = async (req, res, next) => {
    try {
        const key = `user:${req.user._id}`;
        const count = await client.incr(key)

        if (count === 1) {
            await client.expire(key, 60)
        }

        if (count >= 100) {
            return res.status(429).json({ message: "Too many requests" });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            error: "APi-Gateway-Error"
        })
    }
}


const ipBasedRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    message: { message: "Too many requests from this IP" },
    standardHeaders: true,
    legacyHeaders: false,
});

export { userBasedRateLimit, ipBasedRateLimit }
