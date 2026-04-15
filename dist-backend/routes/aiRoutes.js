"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiController_1 = require("../controllers/aiController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const aiValidator_1 = require("../validators/aiValidator");
const rateLimiter_1 = require("../config/rateLimiter");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(authMiddleware_1.protect);
/**
 * Analyze symptoms
 */
router.post("/analyze-symptoms", rateLimiter_1.strictLimiter, (0, validationMiddleware_1.validateRequest)(aiValidator_1.analyzeSymptomsSchema), aiController_1.analyzeSymptoms);
/**
 * Predict diseases
 */
router.post("/predict-disease", (0, authMiddleware_1.authorize)("doctor"), rateLimiter_1.strictLimiter, aiController_1.predictDisease);
/**
 * Recommend treatment
 */
router.post("/recommend-treatment", (0, authMiddleware_1.authorize)("doctor"), rateLimiter_1.strictLimiter, aiController_1.recommendTreatment);
/**
 * Analyze medical images
 */
router.post("/analyze-image", (0, authMiddleware_1.authorize)("doctor"), rateLimiter_1.uploadLimiter, aiController_1.analyzeMedicalImage);
/**
 * Chat with AI
 */
router.post("/chat", rateLimiter_1.strictLimiter, (0, validationMiddleware_1.validateRequest)(aiValidator_1.chatSchema), aiController_1.chatWithAI);
/**
 * Health insights
 */
router.get("/health-insights", aiController_1.getHealthInsights);
/**
 * Analyze prescriptions
 */
router.post("/analyze-prescription", (0, authMiddleware_1.authorize)("doctor"), aiController_1.analyzePrescription);
/**
 * Drug interactions
 */
router.post("/drug-interactions", (0, authMiddleware_1.authorize)("doctor"), aiController_1.checkDrugInteractions);
/**
 * Health tips
 */
router.get("/health-tips", aiController_1.getHealthTips);
/**
 * Analyze vital signs
 */
router.post("/analyze-vitals", (0, validationMiddleware_1.validateRequest)(aiValidator_1.vitalSignsSchema), aiController_1.analyzeVitalSigns);
/**
 * Predict health risks
 */
router.post("/predict-risk", (0, authMiddleware_1.authorize)("doctor"), rateLimiter_1.strictLimiter, aiController_1.predictRisk);
/**
 * Generate health report
 */
router.get("/health-report/:patientId", (0, authMiddleware_1.authorize)("doctor", "patient"), aiController_1.generateHealthReport);
exports.default = router;
