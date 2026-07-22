export const redisCachingKey = {
    UserOtp: (email) => `vaanitube:users:otp:${email}`,
    SessionKey: (userId, tokenId) => `vaanitube:sessions:${userId}:${tokenId}`,
    RefreshLock: (userId, tokenId) => `vaanitube:refresh:lock:${userId}:${tokenId}`,
    RefreshRotation: (userId, tokenId) => `vaanitube:refresh:rotation:${userId}:${tokenId}`,
}
