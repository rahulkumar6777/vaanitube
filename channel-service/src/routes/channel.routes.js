import express from "express";
import { verifyMiddleware } from "../middlewares/verify.middleware.js";
import { channel } from "../controllers/index.js";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";

const channelRouter = express.Router();

channelRouter.route('/channel').post(verifyJwt , channel.create)
channelRouter.get('/channel/validate' , verifyMiddleware , channel.validate)
channelRouter.patch('/channel/:channelId/avatar' , verifyJwt , channel.avatar)

export { channelRouter };