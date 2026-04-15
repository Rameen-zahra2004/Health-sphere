import type { ID } from "./common";

/* ================= BACKEND MODEL ================= */
export interface Doctor {
  _id: ID;
  userId: ID;

  specialization: string;
  experience?: number;
  bio?: string;
  clinicAddress?: string;
  consultationFee?: number;

  isVerified: boolean;

  createdAt: string;
  updatedAt: string;
}

/* ================= ADMIN VIEW ================= */
export interface DoctorAdminView {
  _id: ID;

  firstName: string;
  lastName: string;
  email: string;

  specialization: string;
  experience?: number;
  bio?: string;
  clinicAddress?: string;
  consultationFee?: number;

  isVerified: boolean;
}

/* ================= CREATE DTO ================= */
export type CreateDoctorDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialization: string;
  experience: number;
  bio: string;
  clinicAddress: string;
  consultationFee: number;
};
/* ================= UPDATE DTO ================= */
export type UpdateDoctorDTO = Partial<CreateDoctorDTO>;

/* ================= FORM DTO (UI SAFE) ================= */
export interface DoctorFormDTO {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;

  specialization: string;
  experience: number;
  bio: string;
  clinicAddress: string;
  consultationFee: number;
}