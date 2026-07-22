import express from "express";


// create an instance of express
const app = express();


// Enable trust proxy
app.set('trust proxy', true);


// middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// cookie-parser
import cookieParser from 'cookie-parser';
app.use(cookieParser());


// important security middleware
import helmet from "helmet";
import hpp from "hpp";
app.use(helmet());
app.use(hpp());


export default app;

