import express from "express"


// make express app
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



export { app }
