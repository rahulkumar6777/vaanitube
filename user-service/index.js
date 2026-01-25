import express from 'express';


// dotenv
import dotenv from 'dotenv';
dotenv.config();


// make express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



export { app };