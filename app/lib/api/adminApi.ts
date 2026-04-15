
import axios from "axios";

/* ===============================
   AXIOS INSTANCE (CLEAN SETUP)
================================= */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   TOKEN INTERCEPTOR (SAFE)
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

type AdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type DoctorPayload = {
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

type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

type AppointmentUpdatePayload = {
  status: AppointmentStatus;
};

/* ===============================
   ADMIN API
================================= */

export const adminApi = {
  /* =========================
     ADMIN
  ========================= */

  createAdmin: async (data: AdminPayload) => {
    const res = await api.post("/admin/create-admin", data);
    return res.data;
  },

  getAllAdmins: async () => {
    const res = await api.get("/admin/all");
    return res.data;
  },

  getAdminById: async (id: string) => {
    const res = await api.get(`/admin/${id}`);
    return res.data;
  },

  updateAdmin: async (id: string, data: Partial<AdminPayload>) => {
    const res = await api.patch(`/admin/${id}`, data);
    return res.data;
  },

  deleteAdmin: async (id: string) => {
    const res = await api.delete(`/admin/${id}`);
    return res.data;
  },

  /* =========================
     DOCTORS (FIXED ROUTES)
     NOTE: MUST MATCH BACKEND
  ========================= */

  // ⚠️ Your backend currently does NOT show POST create doctor route.
  // If backend exists, this is correct:
  createDoctor: async (data: DoctorPayload) => {
    const res = await api.post("/admin/doctors", data);
    return res.data;
  },

  getAllDoctors: async () => {
    const res = await api.get("/admin/doctors");
    return res.data;
  },

  // ⚠️ Not present in your backend yet — will only work if you add it
  getDoctorById: async (id: string) => {
    const res = await api.get(`/admin/doctors/${id}`);
    return res.data;
  },

  // ⚠️ Not present in your backend yet — optional
  updateDoctor: async (id: string, data: Partial<DoctorPayload>) => {
    const res = await api.patch(`/admin/doctors/${id}`, data);
    return res.data;
  },

  deleteDoctor: async (id: string) => {
    const res = await api.delete(`/admin/doctors/${id}`);
    return res.data;
  },

  verifyDoctor: async (id: string) => {
    const res = await api.patch(`/admin/doctors/${id}/verify`);
    return res.data;
  },

  /* =========================
     APPOINTMENTS
  ========================= */

  getAllAppointments: async () => {
    const res = await api.get("/appointments");
    return res.data;
  },

  getAppointmentById: async (id: string) => {
    const res = await api.get(`/appointments/${id}`);
    return res.data;
  },

  updateAppointmentStatus: async (
    id: string,
    data: AppointmentUpdatePayload
  ) => {
    const res = await api.patch(`/appointments/${id}/status`, data);
    return res.data;
  },

  deleteAppointment: async (id: string) => {
    const res = await api.delete(`/appointments/${id}`);
    return res.data;
  },

  /* =========================
     PATIENTS
  ========================= */

  getAllPatients: async () => {
    const res = await api.get("/patients");
    return res.data;
  },

  getPatientById: async (id: string) => {
    const res = await api.get(`/patients/${id}`);
    return res.data;
  },

  deletePatient: async (id: string) => {
    const res = await api.delete(`/patients/${id}`);
    return res.data;
  },
};