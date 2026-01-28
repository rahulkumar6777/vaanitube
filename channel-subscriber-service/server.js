import app from "./index.js";

// load environment variable
import dotenv from 'dotenv'
dotenv.config()


// database connection
import { dbConnect } from "./src/configs/db.connect.js";
await dbConnect();



// server port
const PORT = process.env.PORT;


// server listen
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})