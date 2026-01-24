import express from 'express'
import { register } from '../controllers/register.controller.js';
import { verifyRegister } from '../controllers/verifyregister.controller.js';

const router = express.Router();



router.post('/init-register', register)
router.post('/verify-register', verifyRegister)

export default router;