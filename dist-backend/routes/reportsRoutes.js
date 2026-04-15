"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /api/reports
router.get('/', (_req, res) => {
    res.json({ success: true, data: [] });
});
exports.default = router;
