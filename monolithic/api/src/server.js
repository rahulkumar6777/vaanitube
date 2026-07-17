import { connectToMongoDB, disconnectFromMongoDB } from "./config/dataBases/mongoDb.js";
import app from "./index.js";
import { envs } from "./lib/env.js";



process.on("SIGINT", async () => {
    await disconnectFromMongoDB()
})

process.on("SIGTERM", async () => {
    await disconnectFromMongoDB()
});


app.listen(envs.PORT, async () => {
    await connectToMongoDB();
    console.log(`Server is running on port ${envs.PORT} in ${envs.NODE_ENV} mode`);
});