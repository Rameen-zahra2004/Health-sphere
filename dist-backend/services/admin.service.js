"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.deletePatient = exports.getAllPatients = exports.deleteDoctor = exports.verifyDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctorById = exports.getAllDoctors = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = require("../utils/AppError");
const formatDoctor = (doc) => ({
    _id: String(doc._id),
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    specialization: doc.specialization,
    experience: doc.experience,
    bio: doc.bio,
    clinicAddress: doc.clinicAddress,
    consultationFee: doc.consultationFee,
    isVerified: doc.isVerified,
    availability: doc.availability,
});
/* ===============================
   DOCTORS - GET ALL
=============================== */
const getAllDoctors = async () => {
    const doctors = await doctor_1.default.find().sort({ createdAt: -1 });
    return doctors.map((doc) => formatDoctor(doc));
};
exports.getAllDoctors = getAllDoctors;
/* ===============================
   DOCTOR BY ID
=============================== */
const getDoctorById = async (id) => {
    const doctor = await doctor_1.default.findById(id);
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    return formatDoctor(doctor);
};
exports.getDoctorById = getDoctorById;
/* ===============================
   CREATE DOCTOR
=============================== */
const createDoctor = async (data) => {
    const existingUser = await User_1.default.findOne({ email: data.email });
    if (existingUser) {
        throw new AppError_1.AppError("Email already exists", 409);
    }
    const user = await User_1.default.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "doctor",
    });
    const doctor = await doctor_1.default.create({
        userId: user._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        specialization: data.specialization,
        experience: data.experience,
        bio: data.bio || "",
        clinicAddress: data.clinicAddress || "",
        consultationFee: data.consultationFee || 0,
        isVerified: false,
    });
    return formatDoctor(doctor);
};
exports.createDoctor = createDoctor;
/* ===============================
   UPDATE DOCTOR
=============================== */
const updateDoctor = async (id, data) => {
    const doctor = await doctor_1.default.findById(id);
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    Object.assign(doctor, data);
    await doctor.save();
    return formatDoctor(doctor);
};
exports.updateDoctor = updateDoctor;
/* ===============================
   VERIFY DOCTOR
=============================== */
const verifyDoctor = async (id) => {
    const doctor = await doctor_1.default.findById(id);
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    doctor.isVerified = true;
    await doctor.save();
    return formatDoctor(doctor);
};
exports.verifyDoctor = verifyDoctor;
/* ===============================
   DELETE DOCTOR
=============================== */
const deleteDoctor = async (id) => {
    const doctor = await doctor_1.default.findById(id);
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    if (doctor.userId) {
        await User_1.default.findByIdAndDelete(doctor.userId);
    }
    await doctor.deleteOne();
    return {
        success: true,
        message: "Doctor deleted successfully",
    };
};
exports.deleteDoctor = deleteDoctor;
/* ===============================
   PATIENTS
=============================== */
const getAllPatients = async () => {
    const patients = await User_1.default.find({ role: "patient" }).select("-password");
    return patients.map((p) => ({
        _id: String(p._id),
        name: p.name,
        email: p.email,
    }));
};
exports.getAllPatients = getAllPatients;
const deletePatient = async (patientId) => {
    const patient = await User_1.default.findById(patientId);
    if (!patient) {
        throw new AppError_1.AppError("Patient not found", 404);
    }
    await patient.deleteOne();
    return {
        success: true,
        message: "Patient deleted successfully",
    };
};
exports.deletePatient = deletePatient;
/* ===============================
   ADMIN
=============================== */
const createAdmin = async (data) => {
    const exists = await User_1.default.findOne({ email: data.email });
    if (exists) {
        throw new AppError_1.AppError("User already exists", 409);
    }
    const admin = await User_1.default.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "admin",
    });
    return {
        _id: String(admin._id),
        name: admin.name,
        email: admin.email,
        role: admin.role,
    };
};
exports.createAdmin = createAdmin;
