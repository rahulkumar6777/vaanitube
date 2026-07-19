import { connectToMongoDB, disconnectFromMongoDB } from "./config/dataBases/mongoDb.js";
import { connectRedis } from "./config/redis/redis.js";
import app from "./index.js";
import { envs } from "./lib/env.js";


// routers
import router from "./router/index.js";
app.use('/api', router)


// process.on("SIGINT", async () => {
//     await disconnectFromMongoDB()
// })

// process.on("SIGTERM", async () => {
//     await disconnectFromMongoDB()
// });


app.listen(envs.PORT, async () => {
    await connectToMongoDB();
    await connectRedis();
    console.log(`Server is running on port ${envs.PORT} in ${envs.NODE_ENV} mode`);
});