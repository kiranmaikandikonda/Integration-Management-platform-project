import rateLimit from "express-rate-limit";

export const rateMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 100,

    message: {
        success: false,
        message: "Too many requests. Please try again later."
    },

    standardHeaders: true,
    legacyHeaders: false
});

// Separate limiter for OTP endpoints
export const otpRateMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 5,

    message: {
        success: false,
        message: "Too many OTP requests. Please try again later."
    },

    standardHeaders: true,
    legacyHeaders: false
});
