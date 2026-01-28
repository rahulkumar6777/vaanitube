import express from "express"


// load environment variable
import dotenv from 'dotenv'
dotenv.config()


// database connection
import { dbConnect } from "./src/configs/db.connect.js";
await dbConnect();


// rabbitmq init
import { initRabbitMQ } from "./src/configs/rabbitmq.js";
await initRabbitMQ();


const app = express();


export default app;