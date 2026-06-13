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


app.get('/ping', (_req, res) => {
    res.status(200).json({ pong: true })
});


app.use((_req, res) => {
    res.status(404).json({
        success: false, message: 'Not found'
    });
});


app.use((err, _req, res, _next) => {
    logger.error('Unhandled error:', { err: err.message });
    res.status(500).json({
        success: false, message: 'Internal server error'
    });
});


export default app;