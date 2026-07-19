import Redis from 'ioredis';
import { envs } from '../../lib/env.js';


let redis;




export const connectRedis = async () => {
    redis = new Redis(`${envs.REDIS_URL}`, {
        enableReadyCheck: true,
        lazyConnect: true
    });

    await redis.set('foo', 'bar');
    console.log("Redis Connected")
    return redis;
}


export function getRedis() {
    if (!redis) {
        throw Error('redis not initalised')
    }
    return redis;
}