import { consumeQueue } from "../configs/rabbitmq.config.js";
import { updateUserRefreshTOken } from "./slices/user.refreshToken.js";
import { processUserData } from "./slices/userCreate.js";

export const consumeUserData = async () => {
   await consumeQueue('refreshtokenusercreated', processUserData); 
   await consumeQueue('refresh-token-service.send-refresh-token', updateUserRefreshTOken);
}