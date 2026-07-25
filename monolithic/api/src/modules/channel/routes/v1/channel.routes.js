import express from 'express';
import { verifyJwt } from '../../../../middleware/verifyJwt.middleware.js';
import { initChannelPaymentController, verifyChannelPaymentController } from '../../controllers/createChannel.controller.js';
import { initChannelPayment } from '../../validators/channel.validator.js';

const router = express.Router();

router.post('/payment/init', verifyJwt, initChannelPayment, initChannelPaymentController);
router.post('/payment/verify', verifyJwt, verifyChannelPaymentController);

export default router;
