"use strict";
// backend/validators/aiValidator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.vitalSignsSchema = exports.chatSchema = exports.analyzeSymptomsSchema = void 0;
const zod_1 = require("zod");
/**
 * ===============================
 * Analyze Symptoms Schema
 * ===============================
 */
exports.analyzeSymptomsSchema = zod_1.z
    .object({
    symptoms: zod_1.z.array(zod_1.z.string()).nonempty({ message: "Symptoms array cannot be empty" }),
    age: zod_1.z.number().min(0, { message: "Age cannot be negative" }),
    gender: zod_1.z.enum(["male", "female", "other"], {
        message: "Gender must be 'male', 'female', or 'other'",
    }),
})
    .strict();
/**
 * ===============================
 * AI Chat Schema
 * ===============================
 */
exports.chatSchema = zod_1.z
    .object({
    message: zod_1.z.string().min(1, { message: "Message cannot be empty" }),
    userId: zod_1.z.string().uuid({ message: "userId must be a valid UUID" }).optional(),
})
    .strict();
/**
 * ===============================
 * Vital Signs Schema
 * ===============================
 */
exports.vitalSignsSchema = zod_1.z
    .object({
    heartRate: zod_1.z.number().min(30, { message: "Heart rate too low" }).max(220, { message: "Heart rate too high" }),
    bloodPressureSystolic: zod_1.z.number().min(50, { message: "Systolic BP too low" }).max(250, { message: "Systolic BP too high" }),
    bloodPressureDiastolic: zod_1.z.number().min(30, { message: "Diastolic BP too low" }).max(150, { message: "Diastolic BP too high" }),
    respiratoryRate: zod_1.z.number().min(5, { message: "Respiratory rate too low" }).max(60, { message: "Respiratory rate too high" }),
    temperature: zod_1.z.number().min(30, { message: "Temperature too low" }).max(45, { message: "Temperature too high" }),
    oxygenSaturation: zod_1.z.number().min(50, { message: "Oxygen saturation too low" }).max(100, { message: "Oxygen saturation too high" }),
    patientId: zod_1.z.string().uuid({ message: "patientId must be a valid UUID" }),
})
    .strict();
/**
 * ===============================
 * Default export (optional)
 * ===============================
 */
exports.default = {
    analyzeSymptomsSchema: exports.analyzeSymptomsSchema,
    chatSchema: exports.chatSchema,
    vitalSignsSchema: exports.vitalSignsSchema,
};
