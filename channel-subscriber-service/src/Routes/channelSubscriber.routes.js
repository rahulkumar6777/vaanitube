import express from 'express';
import { channelSubscribe } from '../controllers/channelSubscribe.controller.js';
import { channelUnsubscribe } from '../controllers/channelUnsubscriber.controller.js';
import { ChannelSubscriber } from '../models/channelSubscriber.model.js';

const channelSubscriberRoutes = express.Router();

channelSubscriberRoutes.route('/').post(channelSubscribe).delete(channelUnsubscribe).get(ChannelSubscriber)

export default channelSubscriberRoutes;