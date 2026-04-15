"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.setAvatar = exports.updateOwnProfile = exports.deleteUserById = exports.updateUserById = exports.createUser = exports.findUserById = exports.listUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../../models/User"));
const errorHandler_1 = require("../../middleware/errorHandler");
const SAFE_USER_PROJECTION = "firstName lastName email role isActive isVerified createdAt updatedAt";
const toObjectId = (id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new errorHandler_1.AppError("Invalid user id", 400);
    }
    return new mongoose_1.default.Types.ObjectId(id);
};
const normalizePagination = (query) => {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
const buildFilter = (query) => {
    const filter = {};
    if (query.role) {
        filter.role = query.role;
    }
    if (typeof query.isActive === "boolean") {
        filter.isActive = query.isActive;
    }
    if (typeof query.isVerified === "boolean") {
        filter.isVerified = query.isVerified;
    }
    if (query.search && query.search.trim()) {
        const search = query.search.trim();
        filter.$or = [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    return filter;
};
const buildSort = (query) => {
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder === "asc" ? 1 : -1;
    return { [sortBy]: sortOrder };
};
const listUsers = async (query) => {
    const { page, limit, skip } = normalizePagination(query);
    const filter = buildFilter(query);
    const sort = buildSort(query);
    const [items, total] = await Promise.all([
        User_1.default.find(filter).select(SAFE_USER_PROJECTION).sort(sort).skip(skip).limit(limit),
        User_1.default.countDocuments(filter),
    ]);
    return {
        items,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.max(1, Math.ceil(total / limit)),
        },
    };
};
exports.listUsers = listUsers;
const findUserById = async (id) => {
    const _id = toObjectId(id);
    const user = await User_1.default.findById(_id).select(SAFE_USER_PROJECTION);
    if (!user) {
        throw new errorHandler_1.AppError("User not found", 404);
    }
    return user;
};
exports.findUserById = findUserById;
const createUser = async (payload) => {
    const existing = await User_1.default.findOne({ email: payload.email.toLowerCase() });
    if (existing) {
        throw new errorHandler_1.AppError("Email already exists", 409);
    }
    const user = await User_1.default.create({
        ...payload,
        email: payload.email.toLowerCase(),
    });
    const created = await User_1.default.findById(user._id).select(SAFE_USER_PROJECTION);
    return created;
};
exports.createUser = createUser;
const updateUserById = async (id, payload) => {
    const _id = toObjectId(id);
    if (payload.email) {
        const existing = await User_1.default.findOne({
            email: payload.email.toLowerCase(),
            _id: { $ne: _id },
        });
        if (existing) {
            throw new errorHandler_1.AppError("Email already exists", 409);
        }
    }
    const updated = await User_1.default.findByIdAndUpdate(_id, payload.email ? { ...payload, email: payload.email.toLowerCase() } : payload, { new: true, runValidators: true }).select(SAFE_USER_PROJECTION);
    if (!updated) {
        throw new errorHandler_1.AppError("User not found", 404);
    }
    return updated;
};
exports.updateUserById = updateUserById;
const deleteUserById = async (id) => {
    const _id = toObjectId(id);
    const deleted = await User_1.default.findByIdAndDelete(_id);
    if (!deleted) {
        throw new errorHandler_1.AppError("User not found", 404);
    }
    return { deleted: true };
};
exports.deleteUserById = deleteUserById;
const updateOwnProfile = async (userId, payload) => {
    const _id = toObjectId(userId);
    if (payload.role !== undefined) {
        throw new errorHandler_1.AppError("Role cannot be changed from profile endpoint", 403);
    }
    const safePayload = { ...payload };
    delete safePayload.isVerified;
    delete safePayload.isActive;
    if (safePayload.email) {
        const existing = await User_1.default.findOne({
            email: safePayload.email.toLowerCase(),
            _id: { $ne: _id },
        });
        if (existing) {
            throw new errorHandler_1.AppError("Email already exists", 409);
        }
    }
    const updated = await User_1.default.findByIdAndUpdate(_id, safePayload.email ? { ...safePayload, email: safePayload.email.toLowerCase() } : safePayload, { new: true, runValidators: true }).select(SAFE_USER_PROJECTION);
    if (!updated) {
        throw new errorHandler_1.AppError("User not found", 404);
    }
    return updated;
};
exports.updateOwnProfile = updateOwnProfile;
const setAvatar = async (userId, avatarPath) => {
    const _id = toObjectId(userId);
    if (!avatarPath) {
        throw new errorHandler_1.AppError("Avatar path is required", 400);
    }
    const updated = await User_1.default.findByIdAndUpdate(_id, { avatar: avatarPath }, { new: true, runValidators: true }).select(SAFE_USER_PROJECTION);
    if (!updated) {
        throw new errorHandler_1.AppError("User not found", 404);
    }
    return updated;
};
exports.setAvatar = setAvatar;
const getUserStats = async () => {
    const [totalUsers, admins, patients, doctors, activeUsers, verifiedUsers] = await Promise.all([
        User_1.default.countDocuments(),
        User_1.default.countDocuments({ role: "admin" }),
        User_1.default.countDocuments({ role: "patient" }),
        User_1.default.countDocuments({ role: "doctor" }),
        User_1.default.countDocuments({ isActive: true }),
        User_1.default.countDocuments({ isVerified: true }),
    ]);
    return {
        totalUsers,
        admins,
        patients,
        doctors,
        activeUsers,
        verifiedUsers,
    };
};
exports.getUserStats = getUserStats;
