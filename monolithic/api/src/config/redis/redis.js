import Redis from 'ioredis';
import { envs } from '../../lib/env.js';


let redis;

export const connectRedis = async () => {
    redis = new Redis({
        host: `${envs.NODE_ENV === 'production' ? `${envs.REDIS_HOST}` : 'localhost'}`,
        port: `${envs.NODE_ENV === 'production' ? `${envs.REDIS_PORT}` : '6379'}`,
        enableReadyCheck: true,
        lazyConnect: true
    });

    await redis.connect();
    console.log("Redis Connected")
    return redis;
}


export function getRedis() {
    if (!redis) {
        throw Error('redis not initalised')
    }
    return redis;
}