import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { envs } from '../../lib/env.js'
import { getRedis } from '../../config/redis/redis.js';
import { redisCachingKey } from '../cache/rediskeys.js';

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const createSessionKey = (userId, tokenId) => redisCachingKey.SessionKey(userId, tokenId)

const extractDevice = (ua = '') => {
    ua = ua.toLowerCase();

    if (ua.includes('iphone')) return 'iPhone';
    if (ua.includes('android')) return 'Android';
    if (ua.includes('windows')) return 'Windows PC';
    if (ua.includes('mac')) return 'Mac';
    if (ua.includes('linux')) return 'Linux';

    return 'Unknown Device';
};

const generateHashRefreshToken = (refreshToken) => crypto.createHash('sha256').update(refreshToken).digest('hex');

const generateRefreshToken = (userId, role, tokenId) => {
    return jwt.sign(
        {
            _id: userId,
            role
        }, envs.REFRESH_TOKEN_SECRET,
        {
            expiresIn: envs.REFRESH_TOKEN_EXPIRY,
            jwtid: tokenId
        })
};

const generateAccessToken = (userId, role, tokenId) => {
    return jwt.sign(
        {
            _id: userId,
            role
        }, envs.REFRESH_TOKEN_SECRET,
        {
            expiresIn: envs.REFRESH_TOKEN_EXPIRY,
            jwtid: tokenId
        })
}

const generateToken = async (userId, role, req) => {
    const tokenId = crypto.randomUUID();
    const redis = getRedis();

    const refreshToken = generateRefreshToken(userId, role, tokenId);

    await redis.set(
        createSessionKey(userId, tokenId),
        JSON.stringify({
            hashedToken: generateHashRefreshToken(refreshToken),
            ip: req?.ip || '',
            userAgent: req?.headers?.['user-agent'] || '',
            device: extractDevice(req?.headers?.['user-agent']),
            createdAt: Date.now(),
        }),
        'EX',
        SESSION_TTL_SECONDS
    );

    return {
        RefreshToken: refreshToken,
        AccessToken: generateAccessToken(userId, role, tokenId),
        tokenId
    };
}

export {
    SESSION_TTL_SECONDS,
    createSessionKey,
    generateHashRefreshToken,
    generateRefreshToken,
    generateAccessToken,
    generateToken,
}