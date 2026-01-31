import express from 'express';
import { channelSubscribe } from '../controllers/channelSubscribe.controller.js';
import { channelUnsubscribe } from '../controllers/channelUnsubscriber.controller.js';

const channelSubscriberRoutes = express.Router();

channelSubscriberRoutes.route('/').post(channelSubscribe).delete(channelUnsubscribe)

export default channelSubscriberRoutes;