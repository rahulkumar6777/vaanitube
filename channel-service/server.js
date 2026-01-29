import app from "./index.js";


const PORT = process.env.PORT || 5003

// rabbitmq connection
import { closeRabbitMQ, initRabbitMQ } from "./src/configs/rabbitmq.js";
await initRabbitMQ();


// validate internal secret
import internalSecretMiddleware from "./src/middlewares/internalSecret.middleware.js";
app.use(internalSecretMiddleware);


// routes
import { channelRouter } from "./src/routes/channel.routes.js";


app.use("/", channelRouter);


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
    console.log(`Channel service is running on port ${PORT}`);
})