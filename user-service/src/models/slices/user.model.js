import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilepic: {
        type: String,
        default: "https://api-devload.cloudcoderhub.in/public/695f91881242b7ee566ffeea/17693668170573e8c5dea066b2d0f26f74a44.jpg"
    },
    role: {
        type: String,
        required: true,
        enum: ['creator' , 'viewer']
    },
})

export const User = mongoose.model('User', userSchema);