import { app } from "./index.js";
import { initRabbitMQ, closeRabbitMQ } from './src/config/rabbitmq.config.js';


// Initialize RabbitMQ
await initRabbitMQ();




app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})