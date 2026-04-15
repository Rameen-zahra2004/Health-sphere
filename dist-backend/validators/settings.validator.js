"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsValidator = exports.createSettingsValidator = void 0;
const zod_1 = require("zod");
/* =========================
   BASE SETTINGS SCHEMA
========================= */
const baseSettingsSchema = zod_1.z.object({
    emailUpdates: zod_1.z.boolean(),
    smsAlerts: zod_1.z.boolean(),
    notifications: zod_1.z.boolean(),
    darkMode: zod_1.z.boolean(),
});
/* =========================
   CREATE SETTINGS (FULL OBJECT)
   Used when initializing settings
========================= */
exports.createSettingsValidator = baseSettingsSchema.strict();
/* =========================
   UPDATE SETTINGS (PARTIAL PATCH)
   Used for PATCH / PUT requests
========================= */
exports.updateSettingsValidator = baseSettingsSchema
    .partial()
    .strict();
