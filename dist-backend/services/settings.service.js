"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsByUser = exports.getSettingsByUser = void 0;
const settings_model_1 = __importDefault(require("../models/settings.model"));
/* ===============================
   GET SETTINGS
=============================== */
const getSettingsByUser = async (userId) => {
    try {
        let settings = await settings_model_1.default.findOne({ user: userId });
        // AUTO-CREATE if not exists (production pattern)
        if (!settings) {
            settings = await settings_model_1.default.create({
                user: userId,
                emailUpdates: true,
                smsAlerts: true,
                notifications: true,
                darkMode: false,
            });
        }
        return settings;
    }
    catch (error) {
        console.error("GET_SETTINGS_SERVICE_ERROR:", error);
        throw new Error("Failed to get settings");
    }
};
exports.getSettingsByUser = getSettingsByUser;
/* ===============================
   UPDATE SETTINGS
=============================== */
const updateSettingsByUser = async (userId, data) => {
    try {
        // Remove undefined fields (clean update payload)
        const cleanData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
        const updatedSettings = await settings_model_1.default.findOneAndUpdate({ user: userId }, {
            $set: cleanData,
        }, {
            new: true,
            upsert: true, // auto create if not exists
            runValidators: true, // enforce schema rules
        });
        return updatedSettings;
    }
    catch (error) {
        console.error("UPDATE_SETTINGS_SERVICE_ERROR:", error);
        throw new Error("Failed to update settings");
    }
};
exports.updateSettingsByUser = updateSettingsByUser;
