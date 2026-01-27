import exprees from " exprees";


//database connection
import { dbConnect } from "./src/configs/db.connect.js"
await dbConnect();


// rabbitmq connection
import { initRabbitMQ } from "./src/configs/rabbitmq.js";
await initRabbitMQ();

const app = exprees();




export default app;