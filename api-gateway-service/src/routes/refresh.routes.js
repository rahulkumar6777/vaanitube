import express from 'express'
import { ipBasedRateLimit } from '../middlewares/ratelimit.middleware.js';
import proxy from '../proxy/proxy.js';
import services from '../configs/services.js';

const router = express.Router();

router.use("/", ipBasedRateLimit, proxy(services.refreshToken));

export default router;
