import app from "./index.js";


// server port
const PORT = process.env.PORT;


// server listen
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})