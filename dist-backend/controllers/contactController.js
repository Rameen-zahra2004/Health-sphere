"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContact = void 0;
const contact_1 = __importDefault(require("../models/contact"));
const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required",
            });
        }
        const created = await contact_1.default.create({
            name,
            email,
            message,
        });
        return res.status(201).json({
            success: true,
            message: "Message submitted successfully.",
            data: created,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.message || "Failed to submit contact message",
        });
    }
};
exports.submitContact = submitContact;
