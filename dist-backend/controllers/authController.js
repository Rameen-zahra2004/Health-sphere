"use strict";
// import { Request, Response, NextFunction } from "express";
// import crypto from "crypto";
// import User, { IUser } from "../models/User";
// import { AppError } from "../middleware/errorHandler";
// import { sendEmail } from "../utils/sendEmail";
// import { generateToken, verifyToken } from "../utils/tokenUtils";
// import { logger } from "../utils/logger";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.refreshToken = exports.logout = exports.getMe = exports.login = exports.register = void 0;
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
/**
 * 🔐 Send Token Response
 */
const sendTokenResponse = async (user, statusCode, res) => {
    const accessToken = user.getSignedJwtToken();
    const refreshToken = user.getRefreshToken();
    // ✅ Save refresh token in DB
    await user.save({ validateBeforeSave: false });
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };
    res
        .status(statusCode)
        .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .json({
        success: true,
        accessToken,
        data: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        },
    });
};
/**
 * @desc Register User
 * @route POST /api/auth/register
 */
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists",
            });
            return;
        }
        const user = await User_1.default.create({
            firstName,
            lastName,
            email,
            password,
            role: role || "receptionist",
        });
        await sendTokenResponse(user, 201, res);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Registration failed",
        });
    }
};
exports.register = register;
/**
 * @desc Login User
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
            return;
        }
        const user = await User_1.default.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        if (!user.isActive) {
            res.status(401).json({
                success: false,
                message: "Account is deactivated",
            });
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        await sendTokenResponse(user, 200, res);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Login failed",
        });
    }
};
exports.login = login;
/**
 * @desc Get Current User
 * @route GET /api/auth/me
 */
const getMe = async (req, res) => {
    try {
        if (!req.user?.id) {
            res.status(401).json({
                success: false,
                message: "Not authorized",
            });
            return;
        }
        const user = await User_1.default.findById(req.user.id).select("-password");
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch user",
        });
    }
};
exports.getMe = getMe;
/**
 * @desc Logout
 * @route GET /api/auth/logout
 */
const logout = async (_req, res) => {
    res.clearCookie("refreshToken").status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};
exports.logout = logout;
/**
 * @desc Refresh Token
 * @route POST /api/auth/refresh-token
 */
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "No refresh token",
            });
            return;
        }
        const user = await User_1.default.findOne({ refreshToken: token });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
            return;
        }
        const newAccessToken = user.getSignedJwtToken();
        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Token refresh failed",
        });
    }
};
exports.refreshToken = refreshToken;
/**
 * @desc Forgot Password
 * @route POST /api/auth/forgot-password
 */
const forgotPassword = async (req, res) => {
    try {
        const user = await User_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        res.status(200).json({
            success: true,
            message: "Reset link generated",
            resetUrl,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Forgot password failed",
        });
    }
};
exports.forgotPassword = forgotPassword;
/**
 * @desc Reset Password
 * @route PUT /api/auth/reset-password/:token
 */
const resetPassword = async (req, res) => {
    try {
        const token = Array.isArray(req.params.token)
            ? req.params.token[0]
            : req.params.token;
        const hashedToken = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const user = await User_1.default.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid or expired token",
            });
            return;
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        await sendTokenResponse(user, 200, res);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Reset password failed",
        });
    }
};
exports.resetPassword = resetPassword;
/**
 * @desc Update Password
 * @route PUT /api/auth/update-password
 */
const updatePassword = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?.id).select("+password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const isMatch = await user.comparePassword(req.body.currentPassword);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Current password incorrect",
            });
            return;
        }
        user.password = req.body.newPassword;
        await user.save();
        await sendTokenResponse(user, 200, res);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Update password failed",
        });
    }
};
exports.updatePassword = updatePassword;
/**
 * @desc Verify Email
 * @route GET /api/auth/verify-email/:token
 */
const verifyEmail = async (req, res) => {
    try {
        const token = Array.isArray(req.params.token)
            ? req.params.token[0]
            : req.params.token;
        const user = await User_1.default.findOne({
            emailVerificationToken: token,
        });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid verification token",
            });
            return;
        }
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Email verification failed",
        });
    }
};
exports.verifyEmail = verifyEmail;
