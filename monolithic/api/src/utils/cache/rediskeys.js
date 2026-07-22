export const redisCachingKey = {
    UserOtp: (email) => `vaanitube:users:otp:${email}`,
    SessionKey: (userId, tokenId) => `vaanitube:sessions:${userId}:${tokenId}`,
}