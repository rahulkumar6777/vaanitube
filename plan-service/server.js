import app from "./index.js";


// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// db connection
import { dbConnect } from "./src/configs/db.connect.js";
await dbConnect();

// seeding initial plans
import { runSeed } from "./src/seed/seed.js";
await runSeed();

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Plan Service is running on port ${PORT}`);
})
