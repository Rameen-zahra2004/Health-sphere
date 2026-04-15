"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescheduleAppointmentSchema = exports.updateAppointmentSchema = exports.createAppointmentSchema = void 0;
// backend/validators/appointmentValidator.ts
const zod_1 = require("zod");
/**
 * ===============================
 * Create Appointment Schema
 * Validates incoming request to create a new appointment
 * ===============================
 */
exports.createAppointmentSchema = zod_1.z.object({
    patient: zod_1.z.string().uuid({ message: "Patient ID must be a valid UUID" }),
    doctor: zod_1.z.string().uuid({ message: "Doctor ID must be a valid UUID" }),
    appointmentDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Appointment date must be a valid date string" }),
    appointmentTime: zod_1.z.string().min(1, { message: "Appointment time is required" }),
    department: zod_1.z.string().min(1, { message: "Department is required" }),
    reason: zod_1.z.string().optional(),
});
/**
 * ===============================
 * Update Appointment Schema
 * Validates fields allowed for updating an appointment
 * ===============================
 */
exports.updateAppointmentSchema = zod_1.z.object({
    appointmentDate: zod_1.z.string().optional().refine((date) => !date || !isNaN(Date.parse(date)), { message: "Appointment date must be a valid date string" }),
    appointmentTime: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    reason: zod_1.z.string().optional(),
    status: zod_1.z.enum(["scheduled", "completed", "cancelled", "no-show"]).optional(),
});
/**
 * ===============================
 * Reschedule Appointment Schema
 * Validates reschedule requests
 * ===============================
 */
exports.rescheduleAppointmentSchema = zod_1.z.object({
    appointmentDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Appointment date must be a valid date string" }),
    appointmentTime: zod_1.z.string().min(1, { message: "Appointment time is required" }),
});
exports.default = {
    createAppointmentSchema: exports.createAppointmentSchema,
    updateAppointmentSchema: exports.updateAppointmentSchema,
    rescheduleAppointmentSchema: exports.rescheduleAppointmentSchema,
};
