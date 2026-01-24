import { app } from "./index.js";
import { initRabbitMQ, closeRabbitMQ } from './src/configs/rabbitmq.config.js';
import { consumeUserData } from "./src/consumers/index.js";


// Initialize RabbitMQ
await initRabbitMQ();


// Import consumers to start processing messages
await consumeUserData();


// Graceful shutdown
process.on('SIGINT', async () => {
    await closeRabbitMQ();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeRabbitMQ();
    process.exit(0);
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})