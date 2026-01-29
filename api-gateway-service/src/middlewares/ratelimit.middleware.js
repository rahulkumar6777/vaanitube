import { client } from "../configs/redis.js";

const userBasedRateLimit = async (req, res, next) => {
    try {
        const key = `user:${req.user._id}`;
        const count = await client.incr(key)

        if (count === 1) {
            await client.expire(key, 60)
        }

        if (count === 100) {
            return res.status(429).json({ message: "Too many requests" });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            error: "APi-Gateway-Error"
        })
    }
}