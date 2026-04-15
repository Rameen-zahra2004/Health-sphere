"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recordController_1 = require("../controllers/recordController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const recordValidator_1 = require("../validators/recordValidator");
const rateLimiter_1 = require("../config/rateLimiter");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(authMiddleware_1.protect);
/**
 * @route   GET /api/records/shared
 * @desc    Get records shared with current user
 * @access  Private
 */
router.get("/shared", recordController_1.getSharedRecords);
/**
 * @route   GET /api/records/patient/:patientId
 * @desc    Get all records for a specific patient
 * @access  Private/Doctor or Admin or Own Records
 */
router.get("/patient/:patientId", recordController_1.getPatientRecords);
/**
 * @route   GET /api/records/doctor/:doctorId
 * @desc    Get all records created by a specific doctor
 * @access  Private/Doctor or Admin
 */
router.get("/doctor/:doctorId", (0, authMiddleware_1.authorize)("doctor", "admin"), recordController_1.getDoctorRecords);
/**
 * @route   GET /api/records
 * @desc    Get all records (with filtering)
 * @access  Private/Admin
 */
router.get("/", (0, authMiddleware_1.authorize)("admin"), recordController_1.getRecords);
/**
 * @route   POST /api/records
 * @desc    Create a new medical record
 * @access  Private/Doctor
 */
router.post("/", (0, authMiddleware_1.authorize)("doctor"), (0, validationMiddleware_1.validateRequest)(recordValidator_1.createRecordSchema), recordController_1.createRecord);
/**
 * @route   GET /api/records/:id
 * @desc    Get record by ID
 * @access  Private
 */
router.get("/:id", recordController_1.getRecord);
/**
 * @route   PUT /api/records/:id
 * @desc    Update record
 * @access  Private/Doctor (creator) or Admin
 */
router.put("/:id", (0, authMiddleware_1.authorize)("doctor", "admin"), (0, validationMiddleware_1.validateRequest)(recordValidator_1.updateRecordSchema), recordController_1.updateRecord);
/**
 * @route   DELETE /api/records/:id
 * @desc    Delete record
 * @access  Private/Admin
 */
router.delete("/:id", (0, authMiddleware_1.authorize)("admin"), recordController_1.deleteRecord);
/**
 * @route   POST /api/records/:id/upload
 * @desc    Upload file to record (X-ray, MRI, etc.)
 * @access  Private/Doctor
 */
router.post("/:id/upload", (0, authMiddleware_1.authorize)("doctor"), rateLimiter_1.uploadLimiter, recordController_1.uploadRecordFile);
/**
 * @route   GET /api/records/:id/download/:fileId
 * @desc    Download record file
 * @access  Private
 */
router.get("/:id/download/:fileId", recordController_1.downloadRecordFile);
/**
 * @route   POST /api/records/:id/share
 * @desc    Share record with another user/doctor
 * @access  Private/Patient or Doctor
 */
router.post("/:id/share", (0, authMiddleware_1.authorize)("patient", "doctor"), recordController_1.shareRecord);
/**
 * @route   POST /api/records/:id/prescription
 * @desc    Add prescription to record
 * @access  Private/Doctor
 */
router.post("/:id/prescription", (0, authMiddleware_1.authorize)("doctor"), (0, validationMiddleware_1.validateRequest)(recordValidator_1.addPrescriptionSchema), recordController_1.addPrescription);
/**
 * @route   POST /api/records/:id/lab-result
 * @desc    Add lab result to record
 * @access  Private/Doctor
 */
router.post("/:id/lab-result", (0, authMiddleware_1.authorize)("doctor"), recordController_1.addLabResult);
/**
 * @route   POST /api/records/:id/diagnosis
 * @desc    Add diagnosis to record
 * @access  Private/Doctor
 */
router.post("/:id/diagnosis", (0, authMiddleware_1.authorize)("doctor"), recordController_1.addDiagnosis);
/**
 * @route   GET /api/records/:id/history
 * @desc    Get record version history
 * @access  Private/Doctor or Admin
 */
router.get("/:id/history", (0, authMiddleware_1.authorize)("doctor", "admin"), recordController_1.getRecordHistory);
exports.default = router;
