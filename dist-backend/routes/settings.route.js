"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/settings.route.ts
const express_1 = __importDefault(require("express"));
const settings_controller_1 = require("../controllers/settings.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/* ================= PROTECTED ================= */
router.use(authMiddleware_1.protect);
/* ================= ROUTES ================= */
router.get("/me", settings_controller_1.getMySettings);
router.put("/me", settings_controller_1.updateMySettings);
exports.default = router;
