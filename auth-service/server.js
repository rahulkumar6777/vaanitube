import { app } from "./index.js";


// routes
import userRoutes from './src/routes/user.routes.js'



app.use('/api/v1/auth' , userRoutes)


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})