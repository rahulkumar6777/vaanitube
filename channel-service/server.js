import app from "./index.js";


const PORT = process.env.PORT || 5003

// rabbitmq connection
import { initRabbitMQ } from "./src/configs/rabbitmq.js";
await initRabbitMQ();


// routes
import { channelRouter } from "./src/routes/channel.routes.js";


app.use("/api/v1" , channelRouter);


app.listen(PORT , () => {
    console.log(`Channel service is running on port ${PORT}`);
})