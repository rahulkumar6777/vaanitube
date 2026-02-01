import express from 'express'
import { userBasedRateLimit } from '../middlewares/ratelimit.middleware.js';
import proxy from '../proxy/proxy.js';
import services from '../configs/services.js';
import verifyJwt from '../middlewares/verifyJwt.middleware.js';

const router = express.Router();

router.use("/", verifyJwt, userBasedRateLimit, proxy(services.user , 'user-service'));

export default router;
