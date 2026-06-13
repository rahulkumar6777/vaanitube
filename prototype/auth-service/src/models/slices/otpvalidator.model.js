import mongoose from "mongoose";

const otpValidatorschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        expires: 600,
        default: Date.now
    }
})


export const OtpValidate = mongoose.model("OtpValidate", otpValidatorschema)