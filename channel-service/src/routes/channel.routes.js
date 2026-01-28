import express from "express";
import { verifyMiddleware } from "../middlewares/verify.middleware.js";
import { channel } from "../controllers/index.js";

const channelRouter = express.Router();

channelRouter.get('/channel/validate' , verifyMiddleware , channel.validate)


export { channelRouter };