
import axios, { AxiosResponse } from "axios";

/* ===============================
   AXIOS INSTANCE
================================= */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/* ===============================
   TOKEN INTERCEPTOR
================================= */

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

/* ===============================
   TYPES
================================= */

export type AdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type DoctorPayload = {
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

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type AppointmentUpdatePayload = {
  status: AppointmentStatus;
};

/* ===============================
   RESPONSE TYPES (STRICT)
================================= */

type ApiResponse<T> = {
  data?: T;
  doctor?: T;
  doctors?: T;
};

/* ===============================
   SAFE UNWRAPPER (NO ANY)
================================= */

const unwrap = <T>(
  res: AxiosResponse<ApiResponse<T> | T>
): T => {
  const data = res.data;

  if (data && typeof data === "object") {
    const d = data as ApiResponse<T>;

    if ("data" in d && d.data !== undefined) return d.data;
    if ("doctor" in d && d.doctor !== undefined) return d.doctor;
    if ("doctors" in d && d.doctors !== undefined) return d.doctors;
  }

  return data as T;
};

/* ===============================
   ADMIN API
================================= */

export const adminApi = {
  /* ================= ADMIN ================= */

  createAdmin: async (data: AdminPayload) => {
    const res = await api.post("/admin/create-admin", data);
    return unwrap(res);
  },

  getAllAdmins: async () => {
    const res = await api.get("/admin/all");
    return unwrap(res);
  },

  getAdminById: async (id: string) => {
    const res = await api.get(`/admin/${id}`);
    return unwrap(res);
  },

  updateAdmin: async (id: string, data: Partial<AdminPayload>) => {
    const res = await api.patch(`/admin/${id}`, data);
    return unwrap(res);
  },

  deleteAdmin: async (id: string) => {
    const res = await api.delete(`/admin/${id}`);
    return unwrap(res);
  },

  /* ================= DOCTORS ================= */

  createDoctor: async (data: DoctorPayload) => {
    const res = await api.post("/admin/doctors", data);
    return unwrap(res);
  },

  getAllDoctors: async () => {
    const res = await api.get("/admin/doctors");
    return unwrap(res);
  },

  getDoctorById: async (id: string) => {
    const res = await api.get(`/admin/doctors/${id}`);
    return unwrap(res);
  },

  updateDoctor: async (id: string, data: Partial<DoctorPayload>) => {
    const res = await api.patch(`/admin/doctors/${id}`, data);
    return unwrap(res);
  },

  deleteDoctor: async (id: string) => {
    const res = await api.delete(`/admin/doctors/${id}`);
    return unwrap(res);
  },

  verifyDoctor: async (id: string) => {
    const res = await api.patch(`/admin/doctors/${id}/verify`);
    return unwrap(res);
  },

  /* ================= APPOINTMENTS ================= */

  getAllAppointments: async () => {
    const res = await api.get("/appointments");
    return unwrap(res);
  },

  getAppointmentById: async (id: string) => {
    const res = await api.get(`/appointments/${id}`);
    return unwrap(res);
  },

  updateAppointmentStatus: async (
    id: string,
    data: AppointmentUpdatePayload
  ) => {
    const res = await api.patch(`/appointments/${id}/status`, data);
    return unwrap(res);
  },

  updateAppointment: async (
    id: string,
    data: Record<string, unknown>
  ) => {
    const res = await api.patch(`/appointments/${id}`, data);
    return unwrap(res);
  },

  deleteAppointment: async (id: string) => {
    const res = await api.delete(`/appointments/${id}`);
    return unwrap(res);
  },

  /* ================= PATIENTS ================= */

  getAllPatients: async () => {
    const res = await api.get("/patients");
    return unwrap(res);
  },

  getPatientById: async (id: string) => {
    const res = await api.get(`/patients/${id}`);
    return unwrap(res);
  },

  deletePatient: async (id: string) => {
    const res = await api.delete(`/patients/${id}`);
    return unwrap(res);
  },
};