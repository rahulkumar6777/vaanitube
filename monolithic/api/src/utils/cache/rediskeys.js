export const redisCachingKey = {
    UserOtp: (email) => `vaanitube:user:${email}`
}