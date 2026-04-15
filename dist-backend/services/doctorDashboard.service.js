"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorPatients = exports.getDoctorAppointments = exports.getDoctorDashboard = exports.updateDoctorByUserId = exports.getDoctorByUserId = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
const AppError_1 = require("../utils/AppError");
/* =========================
   GET DOCTOR BY USER ID
========================= */
const getDoctorByUserId = async (userId) => {
    const doctor = await doctor_1.default.findOne({
        userId,
        isDeleted: false,
    })
        .select("-password")
        .lean();
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    return doctor;
};
exports.getDoctorByUserId = getDoctorByUserId;
/* =========================
   UPDATE DOCTOR PROFILE
========================= */
const updateDoctorByUserId = async (userId, data) => {
    const updated = await doctor_1.default.findOneAndUpdate({ userId, isDeleted: false }, data, {
        new: true,
        runValidators: true,
    })
        .select("-password")
        .lean();
    if (!updated) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    return updated;
};
exports.updateDoctorByUserId = updateDoctorByUserId;
/* =========================
   DOCTOR DASHBOARD (REAL DATA)
========================= */
const getDoctorDashboard = async (userId) => {
    const doctor = await doctor_1.default.findOne({
        userId,
        isDeleted: false,
    });
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    const doctorId = doctor._id;
    /* TOTAL APPOINTMENTS */
    const totalAppointments = await Appointment_1.default.countDocuments({
        doctorId,
    });
    /* TOTAL UNIQUE PATIENTS */
    const patients = await Appointment_1.default.distinct("patientId", {
        doctorId,
    });
    const totalPatients = patients.length;
    /* UPCOMING APPOINTMENTS */
    const upcomingAppointments = await Appointment_1.default.find({
        doctorId,
        date: { $gte: new Date() },
        status: { $in: ["pending", "confirmed"] },
    })
        .sort({ date: 1 })
        .limit(5)
        .populate("patientId", "name email")
        .lean();
    return {
        doctor: {
            name: `${doctor.firstName} ${doctor.lastName}`,
            specialization: doctor.specialization,
            verified: doctor.isVerified,
        },
        stats: {
            totalPatients,
            totalAppointments,
            totalReviews: 0, // can connect review model later
        },
        upcomingAppointments,
    };
};
exports.getDoctorDashboard = getDoctorDashboard;
/* =========================
   GET DOCTOR APPOINTMENTS
========================= */
const getDoctorAppointments = async (userId, page = 1, limit = 10) => {
    const doctor = await doctor_1.default.findOne({
        userId,
        isDeleted: false,
    });
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    const skip = (page - 1) * limit;
    const appointments = await Appointment_1.default.find({
        doctorId: doctor._id,
    })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate("patientId", "name email")
        .lean();
    const total = await Appointment_1.default.countDocuments({
        doctorId: doctor._id,
    });
    return {
        data: appointments,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        },
    };
};
exports.getDoctorAppointments = getDoctorAppointments;
/* =========================
   GET DOCTOR PATIENTS
========================= */
const getDoctorPatients = async (userId) => {
    const doctor = await doctor_1.default.findOne({
        userId,
        isDeleted: false,
    });
    if (!doctor) {
        throw new AppError_1.AppError("Doctor not found", 404);
    }
    const patients = await Appointment_1.default.aggregate([
        {
            $match: { doctorId: doctor._id },
        },
        {
            $group: {
                _id: "$patientId",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "patient",
            },
        },
        {
            $unwind: "$patient",
        },
        {
            $project: {
                _id: "$patient._id",
                name: "$patient.name",
                email: "$patient.email",
            },
        },
    ]);
    return patients;
};
exports.getDoctorPatients = getDoctorPatients;
