import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
const app = express();

//cors
import cors from 'cors'
import { corsOption } from './src/middlewares/cors.middleware';
app.use(cors(corsOption))


app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on port ${process.env.PORT}`);
});
