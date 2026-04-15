/* ================= BASE ID ================= */
export type ID = string;

/* ================= ROLE ================= */
export type Role = "patient" | "doctor" | "admin";

/* ================= STATUS ================= */
export type Status =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

/* ================= WEEK DAYS ================= */
export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/* ================= TIME FORMAT ================= */
export type TimeString = `${string}:${string}`;

/* ================= BLOOD TYPE ================= */
export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

/* ================= GENDER ================= */
export type Gender = "male" | "female" | "other";

/* ================= USER MODEL ================= */
export interface UserModel {
  _id: ID;

  firstName: string;
  lastName: string;

  email: string;

  role: Role;

  patientId?: ID | null;

  doctorId?: ID | null;

  isActive?: boolean;

  isVerified?: boolean;

  createdAt?: string;
  updatedAt?: string;
}