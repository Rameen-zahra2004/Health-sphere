"use strict";
// import { Request, Response } from "express";
// import { Types } from "mongoose";
// import Appointment from "../models/Appointment";
// import MedicalRecord from "../models/medicalRecord";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.completeAppointmentWithRecord = exports.updateAppointmentStatus = exports.getAllAppointmentsForDoctor = exports.getMyAppointments = exports.createAppointment = void 0;
const mongoose_1 = require("mongoose");
const Appointment_1 = __importDefault(require("../models/Appointment"));
const medicalRecord_1 = __importDefault(require("../models/medicalRecord"));
const appointment_service_1 = require("../services/appointment.service");
const socket_1 = require("../socket");
/* =========================
   HELPERS
========================= */
const normalizeId = (id) => {
    if (!id)
        return null;
    return Array.isArray(id) ? id[0] : id;
};
const getUser = (req) => {
    return req.user ?? null;
};
/* =========================
   POPULATE HELPER ✅
========================= */
const getPopulatedAppointment = async (id) => {
    return await Appointment_1.default.findById(id)
        .populate("patientId", "firstName lastName email")
        .populate("doctorId", "firstName lastName email")
        .lean(); // better performance
};
/* =========================
   SOCKET EMITTER (SAFE)
========================= */
const emitToUsers = async (doctorId, patientId, event, appointmentId) => {
    const io = (0, socket_1.getIO)();
    const populated = await getPopulatedAppointment(appointmentId);
    if (!populated)
        return;
    io.to(`doctor-${doctorId}`).emit(event, populated);
    io.to(`patient-${patientId}`).emit(event, populated);
};
/* =========================
   CREATE APPOINTMENT
========================= */
const createAppointment = async (req, res) => {
    try {
        const user = getUser(req);
        if (!user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const appointment = await (0, appointment_service_1.createAppointmentService)({
            patientId: new mongoose_1.Types.ObjectId(user.id),
            doctorId: new mongoose_1.Types.ObjectId(req.body.doctorId),
            date: new Date(req.body.date),
            time: req.body.time,
            reason: req.body.reason,
        });
        await emitToUsers(appointment.doctorId.toString(), appointment.patientId.toString(), "appointment-created", appointment._id);
        return res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: appointment,
        });
    }
    catch (err) {
        const error = err;
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to create appointment",
        });
    }
};
exports.createAppointment = createAppointment;
/* =========================
   GET MY APPOINTMENTS
========================= */
const getMyAppointments = async (req, res) => {
    try {
        const user = getUser(req);
        if (!user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const appointments = await (0, appointment_service_1.getAppointmentsByPatientService)(user.id);
        return res.status(200).json({
            success: true,
            data: appointments,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch appointments",
        });
    }
};
exports.getMyAppointments = getMyAppointments;
/* =========================
   DOCTOR APPOINTMENTS
========================= */
const getAllAppointmentsForDoctor = async (req, res) => {
    try {
        const user = getUser(req);
        if (!user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const appointments = await Appointment_1.default.find({
            doctorId: new mongoose_1.Types.ObjectId(user.id),
        })
            .populate("patientId", "firstName lastName email")
            .populate("doctorId", "firstName lastName email")
            .populate("medicalRecordId")
            .sort({ date: 1, time: 1 });
        return res.status(200).json({
            success: true,
            data: appointments,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch appointments",
        });
    }
};
exports.getAllAppointmentsForDoctor = getAllAppointmentsForDoctor;
/* =========================
   UPDATE STATUS
========================= */
const updateAppointmentStatus = async (req, res) => {
    try {
        const id = normalizeId(req.params.id);
        const { status } = req.body;
        if (!id || !mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment ID",
            });
        }
        const appointment = await Appointment_1.default.findById(id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }
        appointment.status = status;
        await appointment.save();
        await emitToUsers(appointment.doctorId.toString(), appointment.patientId.toString(), "appointment-updated", appointment._id);
        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: appointment,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update status",
        });
    }
};
exports.updateAppointmentStatus = updateAppointmentStatus;
/* =========================
   COMPLETE APPOINTMENT
========================= */
const completeAppointmentWithRecord = async (req, res) => {
    try {
        const id = normalizeId(req.params.id);
        const { medicalRecordId } = req.body;
        if (!id || !mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment ID",
            });
        }
        const appointment = await Appointment_1.default.findById(id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }
        appointment.status = "completed";
        appointment.medicalRecordId = new mongoose_1.Types.ObjectId(medicalRecordId);
        await appointment.save();
        await medicalRecord_1.default.findByIdAndUpdate(medicalRecordId, {
            appointmentId: appointment._id,
        });
        await emitToUsers(appointment.doctorId.toString(), appointment.patientId.toString(), "appointment-completed", appointment._id);
        return res.status(200).json({
            success: true,
            message: "Appointment completed successfully",
            data: appointment,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to complete appointment",
        });
    }
};
exports.completeAppointmentWithRecord = completeAppointmentWithRecord;
/* =========================
   CANCEL APPOINTMENT
========================= */
const cancelAppointment = async (req, res) => {
    try {
        const id = normalizeId(req.params.id);
        if (!id || !mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment ID",
            });
        }
        const appointment = await Appointment_1.default.findByIdAndUpdate(id, { status: "cancelled" }, { new: true });
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }
        await emitToUsers(appointment.doctorId.toString(), appointment.patientId.toString(), "appointment-cancelled", appointment._id);
        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
            data: appointment,
        });
    }
    catch (err) {
        const error = err;
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to cancel appointment",
        });
    }
};
exports.cancelAppointment = cancelAppointment;
