import axios, { AxiosResponse } from "axios";

/* ================= BASE API ================= */

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= TOKEN INTERCEPTOR ================= */

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ================= ERROR HANDLING ================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message: string =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

/* ================= TYPES ================= */

export interface CreateMedicalRecordDTO {
  patient: string;
  disease: string;
  symptoms: string;
  description: string;
  doctorAssigned?: string;
  appointmentId: string;
}

export interface MedicalRecord {
  _id: string;
  patient: string;
  disease: string;
  symptoms: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  doctorAssigned?: string | null;
  appointmentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/* ================= MEDICAL RECORD API ================= */

export const medicalRecordApi = {
  /* CREATE MEDICAL RECORD */
  createRecord: async (
    data: CreateMedicalRecordDTO
  ): Promise<ApiResponse<MedicalRecord>> => {
    const res: AxiosResponse<ApiResponse<MedicalRecord>> =
      await api.post("/medical-records", data);

    return res.data;
  },

  /* GET MY RECORDS */
  getMyRecords: async (): Promise<ApiResponse<MedicalRecord[]>> => {
    const res: AxiosResponse<ApiResponse<MedicalRecord[]>> =
      await api.get("/medical-records/my-records");

    return res.data;
  },

  /* GET ALL RECORDS */
  getAllRecords: async (): Promise<ApiResponse<MedicalRecord[]>> => {
    const res: AxiosResponse<ApiResponse<MedicalRecord[]>> =
      await api.get("/medical-records");

    return res.data;
  },

  /* GET SINGLE RECORD */
  getSingleRecord: async (
    id: string
  ): Promise<ApiResponse<MedicalRecord>> => {
    const res: AxiosResponse<ApiResponse<MedicalRecord>> =
      await api.get(`/medical-records/${id}`);

    return res.data;
  },

  /* UPDATE RECORD */
  updateRecord: async (
    id: string,
    data: Partial<CreateMedicalRecordDTO>
  ): Promise<ApiResponse<MedicalRecord>> => {
    const res: AxiosResponse<ApiResponse<MedicalRecord>> =
      await api.put(`/medical-records/${id}`, data);

    return res.data;
  },

  /* DELETE RECORD */
  deleteRecord: async (
    id: string
  ): Promise<ApiResponse<{ id: string }>> => {
    const res: AxiosResponse<ApiResponse<{ id: string }>> =
      await api.delete(`/medical-records/${id}`);

    return res.data;
  },
};