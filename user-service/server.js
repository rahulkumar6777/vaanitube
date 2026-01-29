import { app } from "./index.js";
import { initRabbitMQ, closeRabbitMQ } from './src/configs/rabbitmq.js';
import { consumeUserData } from "./src/consumers/index.js";


const PORT = process.env.PORT;


// Initialize RabbitMQ
await initRabbitMQ();


// Import consumers to start processing messages
await consumeUserData();



// routes would be here
import userRouter from "./src/routes/user.router.js";

app.use("/", userRouter);

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
