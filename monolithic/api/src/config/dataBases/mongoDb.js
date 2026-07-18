import mongoose, { connect } from "mongoose";
import { envs } from "../../lib/env.js";
import { print } from '../../utils/logger.js'

const connectToMongoDB = async () => {
    await mongoose.connect(`${envs.MONGODB_URI}`, {
        maxPoolSize: 30,
        minPoolSize: 2,
        authSource: "admin",
    })

    print.log("MongoDb Connected SuccessFully")
}


const disconnectFromMongoDB = async () => {
    await mongoose.disconnect();
    print.log("MongoDb Disconnected")
}

export { connectToMongoDB, disconnectFromMongoDB };
