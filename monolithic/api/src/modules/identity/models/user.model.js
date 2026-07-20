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
    role: {
        type: String,
        required: true,
        enum: ["creator", "viewer"]
    },
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

userschema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this.id,
            role: this.role,
            status: this.status
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userschema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            status: this.status
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userschema);