import express from "express";


// create an instance of express
const app = express();


// middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// important security middleware
import helmet from "helmet";
import hpp from "hpp";
app.use(helmet());
app.use(hpp());


export default app;

