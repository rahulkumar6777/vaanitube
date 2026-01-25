import express from 'express'
import { register } from '../controllers/register.controller.js';
import { verifyRegister } from '../controllers/verifyregister.controller.js';
import { login } from '../controllers/login.controller.js';

const router = express.Router();



router.post('/init-register', register)
router.post('/verify-register', verifyRegister)
router.post('/login', login)

export default router;