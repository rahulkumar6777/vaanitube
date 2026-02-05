import { consumeQueue } from "../../configs/rabbitmq.js";
import { joinChannelMemberShip } from "./channeljoin.js";
import { assertQueue } from "../../configs/rabbitmq.js";


export const consumer = async () => {

    // queue exist karta hai ki nhi ye check kar rahe hai 
    await assertQueue("channel.member.join", { durable: true });

    // and yeha pe hum consume kar rahe hai
    await consumeQueue('channel.member.join', joinChannelMemberShip)
}