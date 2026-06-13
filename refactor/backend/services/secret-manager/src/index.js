import express from 'express';
import helmet from 'helmet';
import { logger } from './config/logger.js';



const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));


app.use((req, _res, next) => {
    logger.debug(`${req.method} ${req.path}`, { ip: req.ip });
    next();
});



export default app;