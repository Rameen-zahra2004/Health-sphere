"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// POST /api/payments/create
router.post('/create', (_req, res) => {
    res.status(201).json({ success: true, message: 'Payment intent created' });
});
exports.default = router;
