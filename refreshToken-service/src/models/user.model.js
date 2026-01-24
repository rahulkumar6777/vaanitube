import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userschema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["creator", "viewer"]
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        required: true,
        default: "active"
    }
})


userschema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            role: this.role,
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
            role: this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User' , userschema)