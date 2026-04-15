"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// models/healthRecord.ts
const mongoose_1 = __importStar(require("mongoose"));
// -----------------------------
// Schema Definition
// -----------------------------
const healthRecordSchema = new mongoose_1.Schema({
    patientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    diagnosis: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    symptoms: {
        type: [String],
        default: [],
        validate: {
            validator: (v) => v.length > 0,
            message: "At least one symptom is required.",
        },
    },
    prescriptions: {
        type: [String],
        default: [],
    },
    vitalSigns: {
        temperature: { type: Number },
        bloodPressure: { type: String },
        heartRate: { type: Number },
        respiratoryRate: { type: Number },
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    visitDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    followUpDate: {
        type: Date,
    },
}, { timestamps: true });
// -----------------------------
// Indexes for performance
// -----------------------------
healthRecordSchema.index({ patientId: 1 });
healthRecordSchema.index({ doctorId: 1 });
healthRecordSchema.index({ visitDate: -1 });
// -----------------------------
// Model Export
// -----------------------------
const HealthRecord = mongoose_1.default.model("HealthRecord", healthRecordSchema);
exports.default = HealthRecord;
