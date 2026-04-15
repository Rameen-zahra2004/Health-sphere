import type { ID, Role } from "./common";

/* ================= USER MODEL ================= */

export interface User {
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

/* ================= SAFE USER VIEW (FOR UI) ================= */

export interface UserMini {
  _id: ID;
  firstName: string;
  lastName: string;
}

/* ================= USER PROFILE UPDATE DTO ================= */

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;

  role?: Role;

  patientId?: ID | null;

  doctorId?: ID | null;
}