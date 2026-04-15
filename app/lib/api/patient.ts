import api from "./api";

/* ================= TYPES ================= */

export interface Patient {
  _id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  isActive?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface UpdatePatientPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

/* ================= API RESPONSE ================= */
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ================= MY PROFILE ================= */
export const getMyPatientProfile = async (): Promise<Patient> => {
  const res = await api.get<ApiResponse<Patient>>("/patients/me");
  return res.data.data;
};

/* ================= UPDATE PROFILE ================= */
export const updatePatientProfile = async (
  payload: UpdatePatientPayload
): Promise<Patient> => {
  const res = await api.put<ApiResponse<Patient>>(
    "/patients/me",
    payload
  );
  return res.data.data;
};

/* ================= ALL PATIENTS (ADMIN) ================= */
export const getAllPatients = async (): Promise<Patient[]> => {
  const res = await api.get<ApiResponse<Patient[]>>("/patients");

  return Array.isArray(res.data.data) ? res.data.data : [];
};