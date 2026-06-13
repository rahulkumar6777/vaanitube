import mongoose from 'mongoose';

const tempuserschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["creator", "viewer"]
    },
    createdAt: {
        type: Date,
        expires: 600,
        default: Date.now
    }
});


export const TempUser = mongoose.model("TempUser", tempuserschema)