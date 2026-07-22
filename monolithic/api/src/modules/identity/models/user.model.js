import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


const userschema = new mongoose.Schema({
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
    phoneNo: {
        type: String,
    },
    age: {
        type: Number,
    },
    verificationType: {
        type: String,
        required: true,
        enum: ["pan", "aadhaar", "passport", "voterid", "drivinglicense"]
    },
    verificationValue: {
        type: String,
        required: true,
        trim: true
    },
    verificationPhotos: [
        {
            fileId: {
                type: String,
                required: true
            },
            publicUrl: {
                type: String,
                required: true
            }
        }
    ],
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    // adId: {
    //     type: String,
    //     required: true
    // },
    profilepic: {
        type: String,
    },
    profilefileid: {
        type: String,
        default: null
    },
    role: {
        type: String,
        required: true,
        enum: ['creator', 'viewer']
    },
    status: {
        type: String,
        enum: ["pending", "inactive", "active", "blocked", "deleted"],
        default: "pending"
    },
    registrationExpiresAt: {
        type: Date
    }
}, { timestamps: true });


userschema.index(
    { registrationExpiresAt: 1 },
    {
        expireAfterSeconds: 0,
        partialFilterExpression: { status: 'pending' },
    }
);

userschema.pre("save", async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

userschema.methods.checkpassword = async function (oldpassword) {
    const result = await bcrypt.compare(oldpassword, this.password)
    return result;
}

export const User = mongoose.model('User', userschema);