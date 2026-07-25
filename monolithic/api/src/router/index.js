import express from 'express';
import channelRouter from '../modules/channel/routes/v1/channel.routes.js';
import identityRouter from '../modules/identity/routes/v1/identity.routes.js';


const router = express.Router();

router.use('/v1/auth', identityRouter);
router.use('/v1/channels', channelRouter);
router.use('/v1/user', identityRouter);

export default router;
