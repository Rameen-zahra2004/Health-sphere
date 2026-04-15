"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateMyProfileSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2).max(50).optional(),
    lastName: zod_1.z.string().min(2).max(50).optional(),
    specialization: zod_1.z.string().min(2).optional(),
    experience: zod_1.z.number().min(0).optional(),
    bio: zod_1.z.string().max(1000).optional(),
    clinicAddress: zod_1.z.string().optional(),
    consultationFee: zod_1.z.number().min(0).optional(),
    availability: zod_1.z.enum(["available", "unavailable"]).optional(),
    hospital: zod_1.z.string().optional(),
});
