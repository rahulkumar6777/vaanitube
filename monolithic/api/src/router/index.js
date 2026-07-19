import express from 'express';
import identityRouter from '../modules/identity/routes/v1/identity.routes.js';


const router = express.Router();

router.use('/v1/auth', identityRouter);
router.use('/v1/user', identityRouter);

export default router;