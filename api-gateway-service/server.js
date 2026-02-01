import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
const app = express();


import { log } from './src/utils/logger.js';
import { traceMiddleware } from './src/middlewares/trace.middleware.js';
app.use(log)
app.use(traceMiddleware)


//cors
import cors from 'cors'
import { corsOption } from './src/middlewares/cors.middleware.js';
app.use(cors(corsOption))


// routes path
import authRoutes from './src/routes/auth.routes.js'
import refreshRoutes from './src/routes/auth.routes.js'
import userRoutes from "./src/routes/user.routes.js"
import channelRoutes from "./src/routes/channel.routes.js"


// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/refresh", refreshRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/channel", channelRoutes);


app.get("/health", (req, res) => res.send("OK"));

app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on port ${process.env.PORT}`);
});
