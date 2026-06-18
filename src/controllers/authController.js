const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis");
const sendOtpEmail = require("../services/emailService");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



//register controller
const register = async (req, res) => {

    const {
        fullName,
        username,
        email,
        password,
        dateOfBirth
    } = req.validatedData;


    const existingUsername = await User.findOne({
        username
    });

    if (existingUsername) {
        return res.status(400).json({
            success: false,
            message: "Username already exists"
        });
    }

    const existingEmail = await User.findOne({
        email
    });

    if (existingEmail) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullName,
        username,
        email,
        password: hashedPassword,
        dateOfBirth
    });

    return res.status(201).json({
        success: true,
        message: "User created successfully"
    });
};

//login controller
const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.validatedData;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }


        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;

        await user.save();

        return res.status(200).json({
            success: true,

            accessToken,

            refreshToken,

            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


//access token generator
const refreshAccessToken = async (req, res) => {

    try {

        const { refreshToken } = req.validatedData;

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const accessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user.id);

        user.refreshToken = newRefreshToken;

        await user.save();


        return res.status(200).json({
            success: true,
            accessToken,
            newRefreshToken
        });

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });

    }
};


//logout
const logout = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.refreshToken = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


//forgot password 
const forgotPassword = async (req, res) => {

    try {

        const { email } = req.validatedData;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        await redisClient.set(
            `otp:${email}`,
            otp,
            {
                EX: 300
            }
        );


        await sendOtpEmail(
            email,
            otp
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

//verify otp 

const verifyResetOtp = async (req, res) => {

    try {

        const {
            email,
            otp
        } = req.validatedData;

        const storedOtp =
            await redisClient.get(
                `otp:${email}`
            );

        if (!storedOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        if (storedOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        await redisClient.set(
            `reset-session:${email}`,
            "verified",
            {
                EX: 600
            }
        );

        await redisClient.del(
            `otp:${email}`
        );

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


//reset password 

const resetPassword = async (req, res) => {

    try {

        const {
            email,
            newPassword
        } = req.validatedData;

        const verified =
            await redisClient.get(
                `reset-session:${email}`
            );

        if (!verified) {
            return res.status(400).json({
                success: false,
                message: "OTP verification required"
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        await User.findOneAndUpdate(
            {
                email
            },
            {
                password: hashedPassword
            }
        );

        await redisClient.del(
            `reset-session:${email}`
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

//oauth

const googleLogin = async (req, res) => {

    try {

        const { token } =
            req.validatedData;

        const ticket =
            await client.verifyIdToken({
                idToken: token,
                audience:
                    process.env.GOOGLE_CLIENT_ID
            });

        const payload =
            ticket.getPayload();

        const {
            sub,
            email,
            name,
            picture
        } = payload;

        let user =
            await User.findOne({
                email
            });

        if (!user) {

            user =
                await User.create({

                    fullName: name,

                    username:
                        email.split("@")[0],

                    email,

                    authProvider:
                        "google",

                    googleId: sub,

                    profilePicture:
                        picture
                });

        }

        const accessToken =
            generateAccessToken(
                user._id
            );

        const refreshToken =
            generateRefreshToken(
                user._id
            );

        user.refreshToken =
            refreshToken;

        await user.save();

        return res.status(200).json({

            success: true,

            accessToken,

            refreshToken,

            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }

        });

    } catch (error) {

        console.error(error);

        return res.status(401).json({

            success: false,
            message: "Google authentication failed"

        });

    }

};



module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    googleLogin
};