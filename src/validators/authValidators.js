const { z } = require("zod");

const registerSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters"),

    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters"),

    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),

    dateOfBirth: z
        .string()
});

const loginSchema = z.object({
    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1)
});


const forgotPasswordSchema = z.object({
    email: z.email("Invalid email address")
});


const verifyOtpSchema = z.object({
    email: z.email(),
    otp: z.string().length(6)
});


const resetPasswordSchema = z.object({
    email: z.email(),
    newPassword: z.string().min(8)
});


const googleLoginSchema = z.object({
    token: z.string().min(1)
});

module.exports = {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    forgotPasswordSchema,
    verifyOtpSchema,
    resetPasswordSchema,
    googleLoginSchema
};