"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const userValidator_1 = require("../validators/userValidator");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(authMiddleware_1.protect);
/**
 * @route   GET /api/users/stats
 * @desc    Get user statistics
 * @access  Private/Admin
 */
router.get("/stats", (0, authMiddleware_1.authorize)("admin"), userController_1.getUserStats);
/**
 * @route   GET /api/users
 * @desc    Get all users (with pagination, filtering, sorting)
 * @access  Private/Admin
 */
router.get("/", (0, authMiddleware_1.authorize)("admin"), userController_1.getUsers);
/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Private/Admin
 */
router.post("/", (0, authMiddleware_1.authorize)("admin"), (0, validationMiddleware_1.validateRequest)(userValidator_1.createUserSchema), userController_1.createUser);
/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private/Admin or Own Profile
 */
router.get("/:id", userController_1.getUser);
/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID
 * @access  Private/Admin
 */
router.put("/:id", (0, authMiddleware_1.authorize)("admin"), (0, validationMiddleware_1.validateRequest)(userValidator_1.updateUserSchema), userController_1.updateUser);
/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID
 * @access  Private/Admin
 */
router.delete("/:id", (0, authMiddleware_1.authorize)("admin"), userController_1.deleteUser);
/**
 * @route   PUT /api/users/profile/update
 * @desc    Update own profile
 * @access  Private
 */
router.put("/profile/update", (0, validationMiddleware_1.validateRequest)(userValidator_1.updateUserSchema), userController_1.updateProfile);
/**
 * @route   POST /api/users/profile/avatar
 * @desc    Upload user avatar
 * @access  Private
 */
router.post("/profile/avatar", userController_1.uploadAvatar);
exports.default = router;
