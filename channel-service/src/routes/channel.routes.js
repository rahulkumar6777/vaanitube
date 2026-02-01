import express from "express";
import { channel } from "../controllers/index.js";

const channelRouter = express.Router();


channelRouter.route('/').post(channel.create);
channelRouter.get('/validate', channel.validate);
channelRouter.patch('/:channelId/avatar', channel.avatar);
channelRouter.patch('/:channelId/banner', channel.banner);
channelRouter.post('/:channelId/subscribe' , channel.subscribe)
channelRouter.delete('/:channelId/unsubscribe' , channel.unsubscriber)
channelRouter.get('/:channelId/subscribers' , channel.unsubscriber)
channelRouter.get('/:channelId/subscribed' , channel.subscribed)
channelRouter.get('/me' , channel.user.subscribedChannels)


export { channelRouter };