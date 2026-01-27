import app from "./index.js";


const PORT = process.eventNames.PORT || 5003


app.listen(PORT , () => {
    console.log(`Channel service is running on port ${PORT}`);
})