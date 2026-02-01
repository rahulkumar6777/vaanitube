import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
const app = express();


import { loggerMiddleware } from './src/middlewares/logger.middleware.js';
import { traceMiddleware } from './src/middlewares/trace.middleware.js';
app.use(traceMiddleware)
app.use(loggerMiddleware)


//cors
import cors from 'cors'
import { corsOption } from './src/middlewares/cors.middleware.js';
app.use(cors(corsOption))


// routes path
import authRoutes from './src/routes/auth.routes.js'
import refreshRoutes from './src/routes/auth.routes.js'
import userRoutes from "./src/routes/user.routes.js"
import channelRoutes from "./src/routes/channel.routes.js"
import { loggerMiddleware } from './src/middlewares/logger.middleware.js';


// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/refresh", refreshRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/channel", channelRoutes);


app.get("/health", (req, res) => res.send("OK"));

app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on port ${process.env.PORT}`);
});
