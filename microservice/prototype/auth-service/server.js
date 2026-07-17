import { app } from "./index.js";
import { initRabbitMQ, closeRabbitMQ } from './src/config/rabbitmq.config.js';


// Initialize RabbitMQ
await initRabbitMQ();




// routes
import userRoutes from './src/routes/user.routes.js'



// validate internal secret
import internalSecret from "./src/middlewares/internalSecret.js";
app.use(internalSecret)



app.use('/', userRoutes)


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