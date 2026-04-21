import Doctor from "../models/doctor";
import User from "../models/User";
import { AppError } from "../utils/AppError";

/* ===============================
   TYPES
=============================== */

type CreateDoctorInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialization: string;
  experience: number;
  bio?: string;
  clinicAddress?: string;
  consultationFee?: number;
};

type UpdateDoctorInput = Partial<CreateDoctorInput>;

/* ===============================
   STRONG TYPED FORMATTER (NO any)
=============================== */

type DoctorDoc = {
  _id: unknown;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  experience: number;
  bio?: string;
  clinicAddress?: string;
  consultationFee?: number;
  isVerified?: boolean;
  availability?: unknown;
  userId?: unknown;
};

const formatDoctor = (doc: DoctorDoc) => ({
  _id: String(doc._id),
  firstName: doc.firstName,
  lastName: doc.lastName,
  email: doc.email,
  specialization: doc.specialization,
  experience: doc.experience,
  bio: doc.bio,
  clinicAddress: doc.clinicAddress,
  consultationFee: doc.consultationFee,
  isVerified: doc.isVerified,
  availability: doc.availability,
});

/* ===============================
   DOCTORS - GET ALL
=============================== */

export const getAllDoctors = async () => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  return doctors.map((doc) => formatDoctor(doc));
};

/* ===============================
   DOCTOR BY ID
=============================== */

export const getDoctorById = async (id: string) => {
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  return formatDoctor(doctor);
};

/* ===============================
   CREATE DOCTOR
=============================== */

export const createDoctor = async (data: CreateDoctorInput) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    role: "doctor",
  });

  const doctor = await Doctor.create({
    userId: user._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    specialization: data.specialization,
    experience: data.experience,
    bio: data.bio || "",
    clinicAddress: data.clinicAddress || "",
    consultationFee: data.consultationFee || 0,
    isVerified: false,
  });

  return formatDoctor(doctor);
};

/* ===============================
   UPDATE DOCTOR
=============================== */

export const updateDoctor = async (
  id: string,
  data: UpdateDoctorInput
) => {
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  Object.assign(doctor, data);

  await doctor.save();

  return formatDoctor(doctor);
};

/* ===============================
   VERIFY DOCTOR
=============================== */

export const verifyDoctor = async (id: string) => {
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  doctor.isVerified = true;
  await doctor.save();

  return formatDoctor(doctor);
};

/* ===============================
   DELETE DOCTOR
=============================== */

export const deleteDoctor = async (id: string) => {
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  if (doctor.userId) {
    await User.findByIdAndDelete(doctor.userId);
  }

  await doctor.deleteOne();

  return {
    success: true,
    message: "Doctor deleted successfully",
  };
};

/* ===============================
   PATIENTS
=============================== */

export const getAllPatients = async () => {
  const patients = await User.find({ role: "patient" }).select("-password");

  return patients.map((p) => ({
    _id: String(p._id),
    name: p.name,
    email: p.email,
  }));
};

export const deletePatient = async (patientId: string) => {
  const patient = await User.findById(patientId);

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  await patient.deleteOne();

  return {
    success: true,
    message: "Patient deleted successfully",
  };
};

/* ===============================
   ADMIN
=============================== */

export const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const exists = await User.findOne({ email: data.email });

  if (exists) {
    throw new AppError("User already exists", 409);
  }

  const admin = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: "admin",
  });

  return {
    _id: String(admin._id),
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };
};