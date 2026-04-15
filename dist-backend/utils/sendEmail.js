"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// utils/sendEmail.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * ===============================
 * Send Email Utility
 * ===============================
 */
const sendEmail = async (options) => {
    try {
        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error("SMTP configuration is missing in environment variables");
        }
        // Create transporter
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        // Email data
        const mailOptions = {
            from: `"Health Sphere" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };
        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${options.to} | Subject: ${options.subject}`);
    }
    catch (error) {
        console.error("Failed to send email:", error.message);
        throw error;
    }
};
exports.sendEmail = sendEmail;
exports.default = exports.sendEmail;
