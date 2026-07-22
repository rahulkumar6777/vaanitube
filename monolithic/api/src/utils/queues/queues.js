import { envs } from "../../lib/env.js";
import { Queue } from 'bullmq'
import { queuesNames } from "./queueNames.js";

export const connection = envs.NODE_ENV === "production"
    ? {
        url: envs.REDIS_URL,
        maxRetriesPerRequest: null,
    }
    : {
        host: envs.REDIS_HOST,
        port: Number(envs.REDIS_PORT),
        maxRetriesPerRequest: null,
    };

export const creatorVerificationQueue = new Queue(queuesNames.CREATOR_VERIFICATION_QUEUE, { connection })
