import exprees from " exprees";


//database connection
import { dbConnect } from "./src/configs/db.connect.js"
await dbConnect();

const app = exprees();




export default app;