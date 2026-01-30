import app from "./index.js";


// server port
const PORT = process.env.PORT;


// validate internal secret
import internalSecretMiddleware from "./src/middlewares/internalSecret.middleware.js";
app.use(internalSecretMiddleware);


import userContextMiddleware from "./src/middlewares/userContext.middleware.js";
app.use(userContextMiddleware)


// server listen
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})