import { app } from "./index.js";
import { initRabbitMQ, closeRabbitMQ } from './src/configs/rabbitmq.config.js';


const PORT = process.env.PORT;


// Initialize RabbitMQ
await initRabbitMQ();


// Graceful shutdown
process.on('SIGINT', async () => {
    await closeRabbitMQ();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeRabbitMQ();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(` User Service is running on port ${PORT}`);
});
