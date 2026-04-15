"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.uploadAvatar = exports.updateProfile = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// ================================
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
// ================================
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getUsers = getUsers;
// ================================
// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
// ================================
const getUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getUser = getUser;
// ================================
// @desc    Create new user
// @route   POST /api/users
// @access  Private/Admin
// ================================
const createUser = async (req, res) => {
    try {
        const user = await User_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createUser = createUser;
// ================================
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
// ================================
const updateUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateUser = updateUser;
// ================================
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
// ================================
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteUser = deleteUser;
// ================================
// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private/User
// ================================
const updateProfile = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateProfile = updateProfile;
// ================================
// @desc    Upload avatar for logged-in user
// @route   POST /api/users/avatar
// @access  Private/User
// ================================
const uploadAvatar = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const avatarPath = req.file ? req.file.path : undefined;
        const updatedUser = await User_1.default.findByIdAndUpdate(req.user.id, { avatar: avatarPath }, { new: true });
        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.uploadAvatar = uploadAvatar;
// ================================
// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private/Admin
// ================================
const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User_1.default.countDocuments();
        const admins = await User_1.default.countDocuments({ role: "admin" });
        const patients = await User_1.default.countDocuments({ role: "patient" });
        const doctors = await User_1.default.countDocuments({ role: "doctor" });
        res.status(200).json({
            success: true,
            data: { totalUsers, admins, patients, doctors },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getUserStats = getUserStats;
