export const redisCachingKey = {
    UserOtp: (email) => `vaanitube:users:otp:${email}`
}