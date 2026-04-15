import api from "@/app/lib/api/api";

/* ================= TYPES ================= */
export interface MedicalRecordPayload {
  disease: string;
  symptoms: string;
  description: string;
}

export interface MedicalRecord {
  _id: string;
  patient: string;
  disease: string;
  symptoms: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ================= SERVICE ================= */
export const medicalRecordService = {
  // CREATE MEDICAL RECORD
  create: async (
    data: MedicalRecordPayload
  ): Promise<ApiResponse<MedicalRecord>> => {
    const res = await api.post("/medical-records", data);
    return res.data;
  },

  // GET MY RECORDS (patient)
  getMy: async (): Promise<ApiResponse<MedicalRecord[]>> => {
    const res = await api.get("/medical-records/my-records");
    return res.data;
  },

  // GET ALL RECORDS (doctor/admin)
  getAll: async (): Promise<ApiResponse<MedicalRecord[]>> => {
    const res = await api.get("/medical-records");
    return res.data;
  },

  // GET SINGLE RECORD
  getById: async (id: string): Promise<ApiResponse<MedicalRecord>> => {
    const res = await api.get(`/medical-records/${id}`);
    return res.data;
  },

  // UPDATE RECORD
  update: async (
    id: string,
    data: Partial<MedicalRecordPayload>
  ): Promise<ApiResponse<MedicalRecord>> => {
    const res = await api.put(`/medical-records/${id}`, data);
    return res.data;
  },

  // DELETE RECORD
  remove: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/medical-records/${id}`);
    return res.data;
  },
};