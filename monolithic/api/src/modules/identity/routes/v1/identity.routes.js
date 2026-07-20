import express from 'express';
import { initRegisterValidator, verifyRegisterViewerValidator } from '../../validators/register.validator.js';
import { initRegisterViewerController, verifyRegisterViewerController } from '../../controllers/register.controller.js';

const router = express.Router();

router.post('/register/init', initRegisterValidator, initRegisterViewerController)
router.post('/register/verify', verifyRegisterViewerValidator, verifyRegisterViewerController)

export default router;