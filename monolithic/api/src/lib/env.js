import dotenv from "dotenv";
dotenv.config();


const requiredEnvs = [
    "PORT", "NODE_ENV",
    "MONGODB_URI", "REDIS_HOST", "REDIS_PORT", "REDIS_URL",
    "MINIO_ENDPOINT", "MINIO_ACCESS_KEY", "MINIO_SECRET_KEY", "MINIO_BUCKET_NAME",
    "DEVLOAD_API_KEY", "DEVLOAD_PROJECT_ID", "DEVLOAD_API_URL", "DEVLOAD_2_API_KEY",
    "EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS",
    "IPINFO_TOKEN"
]

for (const env of requiredEnvs) {
    if (!process.env[env]) {
        throw new Error(`Missing required environment variable: ${env}`);
    }
}


export const envs = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
    MINIO_BUCKET_NAME: process.env.MINIO_BUCKET_NAME,
    DEVLOAD_API_KEY: process.env.DEVLOAD_API_KEY,
    DEVLOAD_API_URL: process.env.DEVLOAD_API_URL,
    DEVLOAD_PROJECT_ID: process.env.DEVLOAD_PROJECT_ID,
    DEVLOAD_2_API_KEY: process.env.DEVLOAD_2_API_KEY,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    REDIS_URL: process.env.REDIS_URL,
    IPINFO_TOKEN: process.env.IPINFO_TOKEN,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY
}