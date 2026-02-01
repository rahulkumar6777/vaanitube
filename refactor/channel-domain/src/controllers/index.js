import { channelAvatar } from "./slices/channelAvatar.js";
import { channelBanner } from "./slices/channelBanner.js";
import { channelValidation } from "./slices/ChannelValidation.js";
import { createChannel } from "./slices/createChannel.js";
import { channelSubscribe } from "./slices/channelSubscribe.controller.js";
import { channelUnsubscribe } from "./slices/channelUnsubscribe.controller.js";
import { getSubscriberCount } from "./slices/channelSubscriber.controller.js";
import { checkSubscribeStatus } from "./slices/checkSubscribeStatus.controller.js";

export const channel = {
    create: createChannel,
    validate: channelValidation,
    avatar: channelAvatar,
    banner: channelBanner,
    subscribe: channelSubscribe,
    unsubscriber: channelUnsubscribe,
    Subscibers: getSubscriberCount,
    subscribed: checkSubscribeStatus
}