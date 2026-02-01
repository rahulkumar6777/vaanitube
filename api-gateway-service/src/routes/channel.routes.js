import express from 'express'
import { userBasedRateLimit } from '../middlewares/ratelimit.middleware.js';
import proxy from '../proxy/proxy.js';
import services from '../configs/services.js';
import verifyJwt from '../middlewares/verifyJwt.middleware.js';

const router = express.Router();

router.use("/", verifyJwt, userBasedRateLimit, proxy(services.channel));
router.use('/:channelId/subscribers', verifyJwt , proxy(services.channelSubscriber));
router.use("/me/subscriptions", verifyJwt, userBasedRateLimit, proxy(`${services.channelSubscriber}/me/subscriptions`));

export default router;
