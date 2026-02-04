import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { spawn } from 'child_process';
import { configDotenv } from 'dotenv';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';
import { getVideoDurationInSeconds } from 'get-video-duration'
import sharp from 'sharp';

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

const resolutions = [
    { name: "144p", height: 144, videoBitrate: "150k", audioBitrate: "64k" },
    { name: "240p", height: 240, videoBitrate: "300k", audioBitrate: "64k" },
    { name: "360p", height: 360, videoBitrate: "800k", audioBitrate: "96k" },
    { name: "480p", height: 480, videoBitrate: "1200k", audioBitrate: "128k" },
    { name: "720p", height: 720, videoBitrate: "2500k", audioBitrate: "128k" },
    { name: "1080p", height: 1080, videoBitrate: "5000k", audioBitrate: "192k" }
];


const thumbnailSizes = [
    { name: "480p", width: 480, height: 270 },
    { name: "720p", width: 720, height: 405 },
    { name: "1080p", width: 1280, height: 720 },
];


const s3client = () => {
    return new S3Client({
        endpoint: process.env.S3_ENDPOINT,
        region: 'auto',
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        },
        forcePathStyle: true
    });
};


// Download video
const downloadVideo = async (vidoeUrl) => {
    try {
        const response = await axios.get(
            `${vidoeUrl}`,
            { responseType: 'stream' }
        );

        const extension = path.extname(new URL(vidoeUrl).pathname).toLowerCase();
        inputFile = `${uploadsDir}/${filename}${extension}`;
        const writer = fs.createWriteStream(inputFile);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(' Video downloaded successfully');
    } catch (err) {
        console.error(' Error downloading video:', err.message);
        process.exit(0);
    }
};