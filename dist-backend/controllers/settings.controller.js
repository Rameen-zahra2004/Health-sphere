"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMySettings = exports.getMySettings = void 0;
const settings_service_1 = require("../services/settings.service");
/* ================= GET SETTINGS ================= */
const getMySettings = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
            });
            return;
        }
        const settings = await (0, settings_service_1.getSettingsByUser)(userId);
        if (!settings) {
            res.status(404).json({
                success: false,
                message: "Settings not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Settings fetched successfully",
            data: settings,
        });
    }
    catch (error) {
        console.error("GET_SETTINGS_ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching settings",
        });
    }
};
exports.getMySettings = getMySettings;
/* ================= UPDATE SETTINGS ================= */
const updateMySettings = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
            });
            return;
        }
        // Prevent empty body updates
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({
                success: false,
                message: "No data provided for update",
            });
            return;
        }
        const updated = await (0, settings_service_1.updateSettingsByUser)(userId, req.body);
        if (!updated) {
            res.status(404).json({
                success: false,
                message: "Failed to update settings",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            data: updated,
        });
    }
    catch (error) {
        console.error("UPDATE_SETTINGS_ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating settings",
        });
    }
};
exports.updateMySettings = updateMySettings;
