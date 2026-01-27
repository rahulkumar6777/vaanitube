import app from "./index.js";


const PORT = process.eventNames.PORT || 5003


// routes
import { channelRouter } from "./src/routes/channel.routes.js";


app.use("/api/v1" , channelRouter);


app.listen(PORT , () => {
    console.log(`Channel service is running on port ${PORT}`);
})