"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rateLimiter_1 = require("../config/rateLimiter");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", rateLimiter_1.authLimiter, authController_1.register);
/**
 * @route   POST /api/auth/login
 * @desc    Login user & get token
 * @access  Public
 */
router.post("/login", rateLimiter_1.authLimiter, authController_1.login);
/**
 * @route   POST /api/auth/logout
 * @desc    Logout user / clear token
 * @access  Private
 */
router.post("/logout", authMiddleware_1.protect, authController_1.logout);
/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
router.get("/me", authMiddleware_1.protect, authController_1.getMe);
/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post("/refresh-token", authController_1.refreshToken);
/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post("/forgot-password", rateLimiter_1.passwordResetLimiter, authController_1.forgotPassword);
/**
 * @route   PUT /api/auth/reset-password/:resetToken
 * @desc    Reset password using token
 * @access  Public
 */
router.put("/reset-password/:resetToken", rateLimiter_1.passwordResetLimiter, authController_1.resetPassword);
/**
 * @route   PUT /api/auth/update-password
 * @desc    Update user password
 * @access  Private
 */
router.put("/update-password", authMiddleware_1.protect, authController_1.updatePassword);
/**
 * @route   GET /api/auth/verify-email/:verificationToken
 * @desc    Verify user email
 * @access  Public
 */
router.get("/verify-email/:verificationToken", authController_1.verifyEmail);
exports.default = router;
