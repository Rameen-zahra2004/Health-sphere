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
exports.createAdmin = exports.deletePatient = exports.getAllPatients = exports.verifyDoctor = exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctorById = exports.getAllDoctors = void 0;
const adminService = __importStar(require("../services/admin.service"));
const AppError_1 = require("../utils/AppError");
/* ===============================
   SAFE PARAM HELPER
=============================== */
const getParamId = (id, label) => {
    if (!id || Array.isArray(id)) {
        throw new AppError_1.AppError(`${label} required`, 400);
    }
    return id;
};
/* ===============================
   RESPONSE WRAPPER (CONSISTENT API)
=============================== */
const sendResponse = (res, data, message = "Success", status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};
/* ===============================
   🟦 DOCTORS CRUD
=============================== */
/**
 * GET ALL DOCTORS
 */
const getAllDoctors = async (_req, res, next) => {
    try {
        const doctors = await adminService.getAllDoctors();
        sendResponse(res, doctors);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllDoctors = getAllDoctors;
/**
 * GET SINGLE DOCTOR (FIXED - MISSING BEFORE)
 */
const getDoctorById = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id, "Doctor ID");
        const doctor = await adminService.getDoctorById(id);
        if (!doctor) {
            throw new AppError_1.AppError("Doctor not found", 404);
        }
        sendResponse(res, doctor);
    }
    catch (error) {
        next(error);
    }
};
exports.getDoctorById = getDoctorById;
/**
 * CREATE DOCTOR
 */
const createDoctor = async (req, res, next) => {
    try {
        const doctor = await adminService.createDoctor(req.body);
        sendResponse(res, doctor, "Doctor created", 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createDoctor = createDoctor;
/**
 * UPDATE DOCTOR
 */
const updateDoctor = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id, "Doctor ID");
        const updatedDoctor = await adminService.updateDoctor(id, req.body);
        if (!updatedDoctor) {
            throw new AppError_1.AppError("Doctor not found", 404);
        }
        sendResponse(res, updatedDoctor, "Doctor updated");
    }
    catch (error) {
        next(error);
    }
};
exports.updateDoctor = updateDoctor;
/**
 * DELETE DOCTOR
 */
const deleteDoctor = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id, "Doctor ID");
        const result = await adminService.deleteDoctor(id);
        sendResponse(res, result, "Doctor deleted");
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDoctor = deleteDoctor;
/**
 * VERIFY DOCTOR
 */
const verifyDoctor = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id, "Doctor ID");
        const result = await adminService.verifyDoctor(id);
        sendResponse(res, result, "Doctor verified");
    }
    catch (error) {
        next(error);
    }
};
exports.verifyDoctor = verifyDoctor;
/* ===============================
   🟨 PATIENTS
=============================== */
/**
 * GET ALL PATIENTS
 */
const getAllPatients = async (_req, res, next) => {
    try {
        const patients = await adminService.getAllPatients();
        sendResponse(res, patients);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllPatients = getAllPatients;
/**
 * DELETE PATIENT
 */
const deletePatient = async (req, res, next) => {
    try {
        const id = getParamId(req.params.id, "Patient ID");
        const result = await adminService.deletePatient(id);
        sendResponse(res, result, "Patient deleted");
    }
    catch (error) {
        next(error);
    }
};
exports.deletePatient = deletePatient;
/* ===============================
   🟪 ADMIN MANAGEMENT
=============================== */
/**
 * CREATE ADMIN
 */
const createAdmin = async (req, res, next) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        sendResponse(res, admin, "Admin created", 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createAdmin = createAdmin;
