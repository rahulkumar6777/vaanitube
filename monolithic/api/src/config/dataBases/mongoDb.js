import mongoose, { connect } from "mongoose";
import { envs } from "../../lib/env.js";


const connectToMongoDB = async () => {
    await mongoose.connect(`${envs.MONGODB_URI}`, {
        maxPoolSize: 30,
        minPoolSize: 2,
        authSource: "admin",
    })
}


const disconnectFromMongoDB = async () => {
    await mongoose.disconnect();
}

export { connectToMongoDB, disconnectFromMongoDB };
