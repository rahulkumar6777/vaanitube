import { consumeQueue } from "../configs/rabbitmq.config.js";
import { processUserData } from "./slices/userCreate.js";

export const consumeUserData = async () => {
   await consumeQueue('useraddonuserservice', processUserData); 
}