"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
// backend/validators/userValidator.ts
const zod_1 = require("zod");
/**
 * ===============================
 * Create User Schema
 * Validates requests for creating a new user
 * ===============================
 */
exports.createUserSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    role: zod_1.z.enum(["admin", "doctor", "patient"], {
        message: "Role must be 'admin', 'doctor', or 'patient'",
    }),
    phone: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
})
    .strict();
/**
 * ===============================
 * Update User Schema
 * Validates requests for updating user information
 * ===============================
 */
exports.updateUserSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1).optional(),
    lastName: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    phone: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
})
    .strict();
/**
 * ===============================
 * Default Export
 * ===============================
 */
exports.default = {
    createUserSchema: exports.createUserSchema,
    updateUserSchema: exports.updateUserSchema,
};
