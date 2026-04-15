"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordHistory = exports.addDiagnosis = exports.addLabResult = exports.addPrescription = exports.getSharedRecords = exports.shareRecord = exports.downloadRecordFile = exports.uploadRecordFile = exports.getDoctorRecords = exports.getPatientRecords = exports.deleteRecord = exports.updateRecord = exports.createRecord = exports.getRecord = exports.getRecords = void 0;
const record_1 = __importDefault(require("../models/record"));
const patient_1 = __importDefault(require("../models/patient"));
const doctor_1 = __importDefault(require("../models/doctor"));
/**
 * ================================
 * Get all records
 * @route   GET /api/records
 * @access  Private/Admin/Doctor
 * ================================
 */
const getRecords = async (req, res) => {
    try {
        const records = await record_1.default.find().populate("patient doctor");
        res.status(200).json({ success: true, count: records.length, data: records });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.getRecords = getRecords;
/**
 * ================================
 * Get single record
 * @route   GET /api/records/:id
 * @access  Private
 * ================================
 */
const getRecord = async (req, res) => {
    try {
        const record = await record_1.default.findById(req.params.id).populate("patient doctor");
        if (!record) {
            res.status(404).json({ success: false, message: "Record not found" });
            return;
        }
        res.status(200).json({ success: true, data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.getRecord = getRecord;
/**
 * ================================
 * Create a new record
 * @route   POST /api/records
 * @access  Private/Doctor
 * ================================
 */
const createRecord = async (req, res) => {
    try {
        const { patient, doctor, title, type, notes } = req.body;
        const patientExists = await patient_1.default.findById(patient);
        if (!patientExists) {
            res.status(404).json({ success: false, message: "Patient not found" });
            return;
        }
        const doctorExists = await doctor_1.default.findById(doctor);
        if (!doctorExists) {
            res.status(404).json({ success: false, message: "Doctor not found" });
            return;
        }
        const record = await record_1.default.create({ patient, doctor, title, type, notes });
        res.status(201).json({ success: true, message: "Record created successfully", data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Bad request";
        res.status(400).json({ success: false, message });
    }
};
exports.createRecord = createRecord;
/**
 * ================================
 * Update a record
 * @route   PUT /api/records/:id
 * @access  Private/Doctor
 * ================================
 */
const updateRecord = async (req, res) => {
    try {
        const record = await record_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!record) {
            res.status(404).json({ success: false, message: "Record not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Record updated successfully", data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Bad request";
        res.status(400).json({ success: false, message });
    }
};
exports.updateRecord = updateRecord;
/**
 * ================================
 * Delete a record
 * @route   DELETE /api/records/:id
 * @access  Private/Admin
 * ================================
 */
const deleteRecord = async (req, res) => {
    try {
        const record = await record_1.default.findByIdAndDelete(req.params.id);
        if (!record) {
            res.status(404).json({ success: false, message: "Record not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Record deleted successfully" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.deleteRecord = deleteRecord;
/**
 * ================================
 * Get records for a specific patient
 * @route   GET /api/records/patient/:patientId
 * @access  Private
 * ================================
 */
const getPatientRecords = async (req, res) => {
    try {
        const records = await record_1.default.find({ patient: req.params.patientId }).populate("doctor");
        res.status(200).json({ success: true, count: records.length, data: records });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.getPatientRecords = getPatientRecords;
/**
 * ================================
 * Get records created by a specific doctor
 * @route   GET /api/records/doctor/:doctorId
 * @access  Private
 * ================================
 */
const getDoctorRecords = async (req, res) => {
    try {
        const records = await record_1.default.find({ doctor: req.params.doctorId }).populate("patient");
        res.status(200).json({ success: true, count: records.length, data: records });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.getDoctorRecords = getDoctorRecords;
/**
 * ================================
 * Upload a file for a record
 * @route   POST /api/records/:id/upload
 * @access  Private/Doctor
 * ================================
 */
const uploadRecordFile = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const record = await record_1.default.findByIdAndUpdate(req.params.id, { file: req.file.path }, { new: true });
        res.status(200).json({ success: true, message: "File uploaded successfully", data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.uploadRecordFile = uploadRecordFile;
/**
 * ================================
 * Download a file from a record
 * @route   GET /api/records/:id/download
 * @access  Private
 * ================================
 */
const downloadRecordFile = async (req, res) => {
    try {
        const record = await record_1.default.findById(req.params.id);
        if (!record || !record.file) {
            res.status(404).json({ success: false, message: "File not found" });
            return;
        }
        res.download(record.file);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.downloadRecordFile = downloadRecordFile;
/**
 * ================================
 * Share a record with another user
 * @route   POST /api/records/:id/share
 * @access  Private
 * ================================
 */
const shareRecord = async (req, res) => {
    try {
        const record = await record_1.default.findByIdAndUpdate(req.params.id, { sharedWith: req.body.sharedWith }, { new: true });
        res.status(200).json({ success: true, message: "Record shared successfully", data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.shareRecord = shareRecord;
/**
 * ================================
 * Get records shared with the authenticated user
 * @route   GET /api/records/shared
 * @access  Private
 * ================================
 */
const getSharedRecords = async (req, res) => {
    try {
        const records = await record_1.default.find({ sharedWith: req.user?.id }).populate("doctor patient");
        res.status(200).json({ success: true, count: records.length, data: records });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.getSharedRecords = getSharedRecords;
/**
 * ================================
 * Add prescription to a record
 * @route   POST /api/records/:id/prescription
 * @access  Private/Doctor
 * ================================
 */
const addPrescription = async (req, res) => {
    try {
        const record = await record_1.default.findByIdAndUpdate(req.params.id, { prescription: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Prescription added successfully", data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Bad request";
        res.status(400).json({ success: false, message });
    }
};
exports.addPrescription = addPrescription;
/**
 * ================================
 * Add lab result to a record
 * @route   POST /api/records/:id/lab
 * @access  Private/Doctor
 * ================================
 */
const addLabResult = async (req, res) => {
    try {
        const record = await record_1.default.findByIdAndUpdate(req.params.id, { labResult: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Lab result added successfully", data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Bad request";
        res.status(400).json({ success: false, message });
    }
};
exports.addLabResult = addLabResult;
/**
 * ================================
 * Add diagnosis to a record
 * @route   POST /api/records/:id/diagnosis
 * @access  Private/Doctor
 * ================================
 */
const addDiagnosis = async (req, res) => {
    try {
        const record = await record_1.default.findByIdAndUpdate(req.params.id, { diagnosis: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Diagnosis added successfully", data: record });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Bad request";
        res.status(400).json({ success: false, message });
    }
};
exports.addDiagnosis = addDiagnosis;
/**
 * ================================
 * Get record history
 * @route   GET /api/records/:id/history
 * @access  Private/Doctor/Patient
 * ================================
 */
const getRecordHistory = async (req, res) => {
    try {
        const record = await record_1.default.findById(req.params.id).populate("doctor patient");
        if (!record) {
            res.status(404).json({ success: false, message: "Record not found" });
            return;
        }
        // For simplicity, return prescription, labResult, diagnosis as history
        const history = {
            prescription: record.prescription || null,
            labResult: record.labResult || null,
            diagnosis: record.diagnosis || null,
        };
        res.status(200).json({ success: true, data: history });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ success: false, message });
    }
};
exports.getRecordHistory = getRecordHistory;
exports.default = {
    getRecords: exports.getRecords,
    getRecord: exports.getRecord,
    createRecord: exports.createRecord,
    updateRecord: exports.updateRecord,
    deleteRecord: exports.deleteRecord,
    getPatientRecords: exports.getPatientRecords,
    getDoctorRecords: exports.getDoctorRecords,
    uploadRecordFile: exports.uploadRecordFile,
    downloadRecordFile: exports.downloadRecordFile,
    shareRecord: exports.shareRecord,
    getSharedRecords: exports.getSharedRecords,
    addPrescription: exports.addPrescription,
    addLabResult: exports.addLabResult,
    addDiagnosis: exports.addDiagnosis,
    getRecordHistory: exports.getRecordHistory,
};
