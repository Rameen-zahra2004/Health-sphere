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
// backend/models/record.ts
const mongoose_1 = __importStar(require("mongoose"));
const PrescriptionSchema = new mongoose_1.Schema({
    medicines: [
        {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true },
            duration: { type: String, required: true },
        },
    ],
    notes: { type: String },
}, { _id: false } // prevent creating a separate _id for nested schema
);
const LabResultSchema = new mongoose_1.Schema({
    testName: { type: String, required: true },
    result: { type: String, required: true },
    unit: { type: String },
    referenceRange: { type: String },
    notes: { type: String },
}, { _id: false });
const DiagnosisSchema = new mongoose_1.Schema({
    condition: { type: String, required: true },
    notes: { type: String },
}, { _id: false });
const RecordSchema = new mongoose_1.Schema({
    patient: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Doctor", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["general", "lab", "prescription", "diagnosis"], required: true },
    notes: { type: String },
    file: { type: String }, // path to uploaded file
    sharedWith: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }], // shared users
    prescription: { type: PrescriptionSchema },
    labResult: { type: LabResultSchema },
    diagnosis: { type: DiagnosisSchema },
}, { timestamps: true } // automatically adds createdAt and updatedAt
);
const Record = mongoose_1.default.model("Record", RecordSchema);
exports.default = Record;
