import { channelAvatar } from "./slices/channelAvatar.js";
import { channelBanner } from "./slices/channelBanner.js";
import { channelValidation } from "./slices/ChannelValidation.js";
import { createChannel } from "./slices/createChannel.js";

export const channel = {
    create: createChannel,
    validate: channelValidation,
    avatar: channelAvatar,
    banner: channelBanner
}