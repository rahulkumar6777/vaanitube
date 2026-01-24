import express from 'express'
import { register } from '../controllers/register.controller';
import { verifyRegister } from '../controllers/verifyregister.controller';

const router = express.Router();



router.post('/init-register', register)

export default router;