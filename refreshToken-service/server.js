import { app } from "./index.js";
import { initRabbitMQ, closeRabbitMQ } from './src/config/rabbitmq.config.js';


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

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})