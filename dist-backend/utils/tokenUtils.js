"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
// utils/tokenUtils.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generate JWT Access Token
 */
const generateAccessToken = (payload, expiresIn = "15m" // default 15 minutes
) => {
    if (!process.env.JWT_SECRET)
        throw new Error("JWT_SECRET is not defined");
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
};
exports.generateAccessToken = generateAccessToken;
/**
 * Generate JWT Refresh Token
 */
const generateRefreshToken = (payload, expiresIn = "7d" // default 7 days
) => {
    if (!process.env.JWT_REFRESH_SECRET)
        throw new Error("JWT_REFRESH_SECRET is not defined");
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, options);
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * Verify JWT Access Token
 */
const verifyAccessToken = (token) => {
    if (!process.env.JWT_SECRET)
        throw new Error("JWT_SECRET is not defined");
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
/**
 * Verify JWT Refresh Token
 */
const verifyRefreshToken = (token) => {
    if (!process.env.JWT_REFRESH_SECRET)
        throw new Error("JWT_REFRESH_SECRET is not defined");
    return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
exports.default = {
    generateAccessToken: exports.generateAccessToken,
    generateRefreshToken: exports.generateRefreshToken,
    verifyAccessToken: exports.verifyAccessToken,
    verifyRefreshToken: exports.verifyRefreshToken,
};
