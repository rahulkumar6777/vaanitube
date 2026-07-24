import Razorpay from 'razorpay';
import { envs } from '../../lib/env.js';


export const razorpay = new Razorpay({
    key_id: `${envs.RAZORPAY_KEY_ID}`,
    key_secret: `${envs.RAZORPAY_KEY_SECRET}`,
});