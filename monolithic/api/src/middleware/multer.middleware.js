import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { AppError } from '../utils/errors/AppError.js';

const uploadDir = path.resolve('uploads/image')
const MAX_PIC_SIZE = 10 * 1024 * 1024;
const allowedExtensions = new Set(['.jpeg', '.jpg', '.png', '.webp']);
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const ensureUploadDir = () => {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureUploadDir();
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

export const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: MAX_PIC_SIZE,
        files: 2,
    },
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLocaleLowerCase();
        if (allowedExtensions.has(ext) && allowedMimeTypes.has(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new AppError('Invalid file type', 400), false);
        }
    }
});

export const handleUploadError = (err, _req, res, next) => {
    if (!err) {
        return next();
    }

    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                return res.status(400).json({
                    message: "Each image must be smaller than 10MB"
                });

            case "LIMIT_FILE_COUNT":
                return res.status(400).json({
                    message: "Maximum 2 images are allowed"
                });

            default:
                return res.status(400).json({
                    message: err.message
                });
        }
    }

    return res.status(err.status || 400).json({
        message: err.msg || 'Invalid file upload'
    });
};
