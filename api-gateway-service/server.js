import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
const app = express();

app.use(express.json());


//cors
import cors from 'cors'
import { corsOption } from './src/middlewares/cors.middleware';
app.use(cors(corsOption))


// routes path
import authRoutes from './src/routes/auth.routes.js'



// routes
app.use("/api/v1/auth", authRoutes);


app.get("/health", (req, res) => res.send("OK"));

app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on port ${process.env.PORT}`);
});
