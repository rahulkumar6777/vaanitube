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


// Paths and filenames
const ffmpegPath = '/usr/bin/ffmpeg';
const outputDir = 'hls_output';
const thumbnailoutputDir = 'thumbnailOutput';
const uploadsDir = 'uploads';
const ffprobePath = "/usr/bin/ffprobe";
const resizedThumbnailPath = 'resizedthumbnail'


if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(thumbnailoutputDir)) fs.mkdirSync(thumbnailoutputDir, { recursive: true });
if (!fs.existsSync(resizedThumbnailPath)) fs.mkdirSync(resizedThumbnailPath, { recursive: true });