import express from 'express';
import { getPlan } from '../controller/plan.controller.js';

const router = express.Router();

router.get('/plan/:id', getPlan)

export default router;