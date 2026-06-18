const express = require("express");

const { register, login, refreshAccessToken, logout, forgotPassword, verifyResetOtp, resetPassword, googleLogin } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema, refreshTokenSchema, forgotPasswordSchema, verifyOtpSchema , resetPasswordSchema, googleLoginSchema} = require("../validators/authValidators");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post(
    "/refresh-token",
    validate(refreshTokenSchema),
    refreshAccessToken
);

router.post(
    "/logout",
    protect,
    logout
);

router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    forgotPassword
);

router.post(
    "/verify-reset-otp",
    validate(verifyOtpSchema),
    verifyResetOtp
);

router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    resetPassword
);

router.post(
    "/google",
    validate(googleLoginSchema),
    googleLogin
);



module.exports = router;

