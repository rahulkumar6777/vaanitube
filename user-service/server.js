import { app } from "./index.js";


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(` User Service is running on port ${PORT}`);
});
