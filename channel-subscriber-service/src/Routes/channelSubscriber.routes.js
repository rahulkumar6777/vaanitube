import express from 'express';
import { channelSubscribe } from '../controllers/channelSubscribe.controller.js';

const channelSubscriberRoutes = express.Router();

channelSubscriberRoutes.route('/').post(channelSubscribe)

export default channelSubscriberRoutes;