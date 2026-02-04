// dotenv connection
import dotenv from 'dotenv'
dotenv.config()


// redis connection
import { Redis } from 'ioredis';
const connection = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
});