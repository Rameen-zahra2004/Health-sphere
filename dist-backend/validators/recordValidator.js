"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPrescriptionSchema = exports.updateRecordSchema = exports.createRecordSchema = void 0;
// backend/validators/recordValidator.ts
const zod_1 = require("zod");
/**
 * ===============================
 * Create Record Schema
 * Validates creating a new record
 * ===============================
 */
exports.createRecordSchema = zod_1.z.object({
    patient: zod_1.z.string().uuid({ message: "Patient ID must be a valid UUID" }),
    doctor: zod_1.z.string().uuid({ message: "Doctor ID must be a valid UUID" }),
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    type: zod_1.z.enum(["general", "lab", "prescription", "diagnosis"]),
    notes: zod_1.z.string().optional(),
    file: zod_1.z.string().optional(), // store file path
});
/**
 * ===============================
 * Update Record Schema
 * Validates updating an existing record
 * ===============================
 */
exports.updateRecordSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }).optional(),
    notes: zod_1.z.string().optional(),
    file: zod_1.z.string().optional(),
    sharedWith: zod_1.z.array(zod_1.z.string().uuid()).optional(), // array of user IDs
});
/**
 * ===============================
 * Add Prescription Schema
 * Validates adding prescription details
 * ===============================
 */
exports.addPrescriptionSchema = zod_1.z.object({
    medicines: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Medicine name is required" }),
        dosage: zod_1.z.string().min(1, { message: "Dosage is required" }),
        frequency: zod_1.z.string().min(1, { message: "Frequency is required" }),
        duration: zod_1.z.string().min(1, { message: "Duration is required" }),
    }))
        .nonempty({ message: "At least one medicine is required" }),
    notes: zod_1.z.string().optional(),
});
/**
 * ===============================
 * Default Export
 * ===============================
 */
exports.default = {
    createRecordSchema: exports.createRecordSchema,
    updateRecordSchema: exports.updateRecordSchema,
    addPrescriptionSchema: exports.addPrescriptionSchema,
};
