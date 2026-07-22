export const redisCachingKey = {
    UserOtp: (email) => `vaanitube:users:otp:${email}`,
    SessionKey: (userId, tokenId) => `vaanitube:users:session:${userId}:${tokenId}`,
}