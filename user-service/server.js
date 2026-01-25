import { app } from "./index.js";
import { initRabbitMQ, closeRabbitMQ } from './src/configs/rabbitmq.config.js';



// Initialize RabbitMQ
await initRabbitMQ();


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(` User Service is running on port ${PORT}`);
});
