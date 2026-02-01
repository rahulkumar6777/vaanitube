import express from "express";
import { channel } from "../controllers/index.js";

const channelRouter = express.Router();


channelRouter.route('/').post(channel.create);
channelRouter.get('/validate', channel.validate);
channelRouter.patch('/:channelId/avatar', channel.avatar);
channelRouter.patch('/:channelId/banner', channel.banner);
channelRouter.post('/:channelId/subscribe' , channel.subscribe)
channelRouter.post('/:channelId/unsubscribe' , channel.unsubscriber)


export { channelRouter };