import { channelValidation } from "./slices/ChannelValidation.js";
import { createChannel } from "./slices/createChannel.js";

export const channel = {
    create: createChannel,
    validate: channelValidation
}