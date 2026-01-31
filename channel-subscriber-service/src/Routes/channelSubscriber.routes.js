import express from 'express';
import { channelSubscribe } from '../controllers/channelSubscribe.controller.js';
import { channelUnsubscribe } from '../controllers/channelUnsubscriber.controller.js';
import { ChannelSubscriber } from '../models/channelSubscriber.model.js';
import { channelMe } from '../controllers/channelme.controller.js';
import { checkSubscribeStatus } from '../controllers/checkSubscribeStatus.controller.js';

const channelSubscriberRoutes = express.Router();

channelSubscriberRoutes.route('/').post(channelSubscribe).delete(channelUnsubscribe).get(ChannelSubscriber)
channelSubscriberRoutes.get('/me', checkSubscribeStatus)
channelSubscriberRoutes.get('/me/subscription', channelMe)

export default channelSubscriberRoutes;