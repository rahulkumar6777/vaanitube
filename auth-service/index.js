import express from "express"


// make express app
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// security middleware
import hpp from "hpp";
import helmet from "helmet"


app.use(hpp());
app.use(helmet());


export { app }
