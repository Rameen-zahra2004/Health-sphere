import { Request, Response, NextFunction } from "express";
import * as adminService from "../services/admin.service";
import { AppError } from "../utils/AppError";

/* ===============================
   SAFE PARAM HELPER
=============================== */
const getParamId = (
  id: string | string[] | undefined,
  label: string
): string => {
  if (!id || Array.isArray(id)) {
    throw new AppError(`${label} required`, 400);
  }
  return id;
};

/* ===============================
   RESPONSE WRAPPER (CONSISTENT API)
=============================== */
const sendResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

/* ===============================
   🟦 DOCTORS CRUD
=============================== */

/**
 * GET ALL DOCTORS
 */
export const getAllDoctors = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctors = await adminService.getAllDoctors();
    sendResponse(res, doctors);
  } catch (error) {
    next(error);
  }
};

/**
 * GET SINGLE DOCTOR (FIXED - MISSING BEFORE)
 */
export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id, "Doctor ID");

    const doctor = await adminService.getDoctorById(id);

    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    sendResponse(res, doctor);
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE DOCTOR
 */
export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctor = await adminService.createDoctor(req.body);

    sendResponse(res, doctor, "Doctor created", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE DOCTOR
 */
export const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id, "Doctor ID");

    const updatedDoctor = await adminService.updateDoctor(id, req.body);

    if (!updatedDoctor) {
      throw new AppError("Doctor not found", 404);
    }

    sendResponse(res, updatedDoctor, "Doctor updated");
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE DOCTOR
 */
export const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id, "Doctor ID");

    const result = await adminService.deleteDoctor(id);

    sendResponse(res, result, "Doctor deleted");
  } catch (error) {
    next(error);
  }
};

/**
 * VERIFY DOCTOR
 */
export const verifyDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id, "Doctor ID");

    const result = await adminService.verifyDoctor(id);

    sendResponse(res, result, "Doctor verified");
  } catch (error) {
    next(error);
  }
};

/* ===============================
   🟨 PATIENTS
=============================== */

/**
 * GET ALL PATIENTS
 */
export const getAllPatients = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patients = await adminService.getAllPatients();
    sendResponse(res, patients);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE PATIENT
 */
export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = getParamId(req.params.id, "Patient ID");

    const result = await adminService.deletePatient(id);

    sendResponse(res, result, "Patient deleted");
  } catch (error) {
    next(error);
  }
};

/* ===============================
   🟪 ADMIN MANAGEMENT
=============================== */

/**
 * CREATE ADMIN
 */
export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const admin = await adminService.createAdmin(req.body);

    sendResponse(res, admin, "Admin created", 201);
  } catch (error) {
    next(error);
  }
};