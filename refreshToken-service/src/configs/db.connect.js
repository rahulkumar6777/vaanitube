import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.NODE_ENV === 'production' ? process.env.MONGO_PRODUCTION_URL : process.env.MONGO_DEVELOPMENT_URL}`, {
            authSource: 'admin'
        });
        console.log("DataBAse Connected");
    } catch (error) {
        console.log("DataBase Connection Error")
        process.exit(1)
    }
}

export { dbConnect }