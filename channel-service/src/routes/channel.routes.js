import express from "express";
import { verifyMiddleware } from "../middlewares/verify.middleware.js";
import { channel } from "../controllers/index.js";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";

const channelRouter = express.Router();


channelRouter.route('/').post(verifyJwt , channel.create);
channelRouter.get('/validate'  , channel.validate);
channelRouter.patch('/:channelId/avatar' , verifyJwt , channel.avatar);
channelRouter.patch('/:channelId/banner' , verifyJwt , channel.banner);


export { channelRouter };