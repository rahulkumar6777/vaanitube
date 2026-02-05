import { consumeQueue } from "../../configs/rabbitmq.js";
import { joinChannelMemberShip } from "./channeljoin.js";
import { assertQueue } from "../../configs/rabbitmq.js";


export const consumer = async () => {

    // Step 1: Ensure queue exists
    await assertQueue("channel.member.join", { durable: true });

    await consumeQueue('channel.member.join', joinChannelMemberShip)
}