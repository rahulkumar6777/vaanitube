import express from 'express';
import { initRegisterValidator } from '../../validators/register.validator.js';
import { initRegisterViewerController } from '../../controllers/register.controller.js';

const router = express.Router();

router.post('/register/init', initRegisterValidator, initRegisterViewerController)

export default router;