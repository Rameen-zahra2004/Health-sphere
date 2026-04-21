import express from "express";
import { z } from "zod";

import { isAdmin } from "../middleware/admin.middleware";
import { protect } from "../middleware/authMiddleware";
import { validateParams } from "../middleware/validationMiddleware";

import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  verifyDoctor,
  deleteDoctor,

  getAllPatients,
  deletePatient,

  createAdmin,
} from "../controllers/admin.controller";

import { doctorIdSchema } from "../validators/doctorValidator";

const router = express.Router();

/* ===============================
   PATIENT ID VALIDATION
=============================== */

const patientIdSchema = z.object({
  id: z.string().min(1, "Patient ID required"),
});

/* ===============================
   DOCTOR ROUTES (FULL CRUD)
=============================== */

/**
 * GET ALL DOCTORS
 */
router.get(
  "/doctors",
  protect,
  isAdmin,
  getAllDoctors
);

/**
 * GET SINGLE DOCTOR
 */
router.get(
  "/doctors/:id",
  protect,
  isAdmin,
  validateParams(doctorIdSchema),
  getDoctorById
);

/**
 * CREATE DOCTOR
 */
router.post(
  "/doctors",
  protect,
  isAdmin,
  createDoctor
);

/**
 * UPDATE DOCTOR
 */
router.patch(
  "/doctors/:id",
  protect,
  isAdmin,
  validateParams(doctorIdSchema),
  updateDoctor
);

/**
 * VERIFY DOCTOR
 */
router.patch(
  "/doctors/:id/verify",
  protect,
  isAdmin,
  validateParams(doctorIdSchema),
  verifyDoctor
);

/**
 * DELETE DOCTOR
 */
router.delete(
  "/doctors/:id",
  protect,
  isAdmin,
  validateParams(doctorIdSchema),
  deleteDoctor
);

/* ===============================
   PATIENT ROUTES
=============================== */

/**
 * GET ALL PATIENTS
 */
router.get(
  "/patients",
  protect,
  isAdmin,
  getAllPatients
);

/**
 * DELETE PATIENT
 */
router.delete(
  "/patients/:id",
  protect,
  isAdmin,
  validateParams(patientIdSchema),
  deletePatient
);

/* ===============================
   ADMIN ROUTES
=============================== */

/**
 * CREATE ADMIN
 */
router.post(
  "/create-admin",
  protect,
  isAdmin,
  createAdmin
);

export default router;