import app from "./index.js";

// load environment variable
import dotenv from 'dotenv'
dotenv.config()


// server port
const PORT = process.env.PORT;


// server listen
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})