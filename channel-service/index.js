import express from " express";


//database connection
import { dbConnect } from "./src/configs/db.connect.js"
await dbConnect();


// rabbitmq connection
import { initRabbitMQ } from "./src/configs/rabbitmq.js";
await initRabbitMQ();


const app = express();


// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// seciurity middleware
import hpp from "hpp";
import helmet from "helmet"
app.use(hpp());
app.use(helmet());


export default app;