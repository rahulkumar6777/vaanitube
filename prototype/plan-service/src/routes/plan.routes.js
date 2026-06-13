import express from 'express';
import { getPlan } from '../controller/plan.controller.js';
import { verifyMiddleware } from '../middleware/verify.middleware.js';

const router = express.Router();

router.get('/plan/:id', verifyMiddleware , getPlan)

export default router;