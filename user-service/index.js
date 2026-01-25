import express from 'express';


// dotenv
import dotenv from 'dotenv';
dotenv.config();


// database connection
import { dbConnect } from './src/configs/db.connect.js';
await dbConnect();


// make express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



export { app };