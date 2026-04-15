/* ================= BASE TYPES ================= */

export type ID = string;

export type Gender = "male" | "female" | "other";

export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

/* ================= MEDICAL RECORD ================= */

export interface MedicalRecord {
  _id: ID;

  type: "diagnosis" | "prescription" | "lab_result" | "imaging" | "procedure";

  title: string;
  description: string;

  date: string;

  doctorId: ID;
  doctorName: string;

  attachments?: string[];
}

/* ================= SUPPORT TYPES ================= */

export interface EmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
  email?: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface InsuranceInfo {
  provider?: string;
  policyNumber?: string;
  groupNumber?: string;
  expiryDate?: string;
}

/* ================= MAIN PATIENT MODEL ================= */

export interface Patient {
  _id: ID;

  // ✅ FIXED (single, consistent definition)
  userId?: ID;

  firstName: string;
  lastName: string;

  email?: string;
  phone?: string;

  profileImage?: string;
  avatar?: string;

  dateOfBirth?: string;

  gender?: Gender;
  bloodType?: BloodType;

  allergies?: string[];

  medicalHistory?: MedicalRecord[];

  emergencyContact?: EmergencyContact;

  address?: Address;

  insuranceInfo?: InsuranceInfo;

  createdAt?: string;
  updatedAt?: string;
}

/* ================= UI PROFILE TYPE ================= */

export interface PatientProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;

  gender?: Gender;
  bloodType?: BloodType;

  allergies?: string[];

  emergencyContact?: EmergencyContact;
  address?: Address;
  insuranceInfo?: InsuranceInfo;
}

/* ================= UPDATE DTO ================= */

export interface UpdatePatientDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;

  gender?: Gender;
  bloodType?: BloodType;

  address?: string;
}

/* ================= FORM TYPE ================= */

export interface PatientForm {
  firstName: string;
  lastName: string;
  phone: string;

  bloodType: BloodType | "";
  gender: Gender | "";
}

/* ================= LEGACY SUPPORT ================= */

export type UpdatePatientPayload = Partial<UpdatePatientDTO>;