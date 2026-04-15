
import api from "./api";

/* =========================
   GENERIC API RESPONSE
========================= */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/* =========================
   DOCTOR TYPES
========================= */
export interface DoctorProfile {
  readonly _id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly specialization: string;
  readonly experience: number;

  readonly bio?: string;
  readonly clinicAddress?: string;
  readonly consultationFee?: number;

  readonly availability: "available" | "unavailable";
  readonly hospital?: string;

  readonly isVerified: boolean;

  readonly profileImage?: string; // ✅ FIX ADDED
}

/* =========================
   DASHBOARD TYPES
========================= */
export interface DoctorDashboardStats {
  readonly totalPatients: number;
  readonly totalAppointments: number;
  readonly totalReviews: number;
}

export interface DashboardDoctorInfo {
  readonly name: string;
  readonly specialization: string;
  readonly verified: boolean;
}

/* =========================
   APPOINTMENT TYPES
========================= */
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface PatientMini {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
}

export interface Appointment {
  readonly _id: string;
  readonly patientId: PatientMini;

  readonly doctorId: string;

  readonly date: string;
  readonly time: string;
  readonly reason: string;

  readonly status: AppointmentStatus;
}

/* =========================
   DASHBOARD RESPONSE
========================= */
export interface DoctorDashboardResponse {
  readonly doctor: DashboardDoctorInfo;
  readonly stats: DoctorDashboardStats;
  readonly upcomingAppointments: readonly Appointment[];
}

/* =========================
   DOCTOR DASHBOARD API
========================= */
class DoctorDashboardApi {
  /* GET PROFILE */
  async getProfile(): Promise<DoctorProfile> {
    const res = await api.get<ApiResponse<DoctorProfile>>(
      "/doctors/profile" // ✅ FIXED
    );

    return res.data.data;
  }

  /* UPDATE PROFILE */
  async updateProfile(
    data: Partial<Omit<DoctorProfile, "_id" | "email">>
  ): Promise<DoctorProfile> {
    const res = await api.put<ApiResponse<DoctorProfile>>(
      "/doctors/profile", // ✅ FIXED
      data
    );

    return res.data.data;
  }

  /* GET DASHBOARD */
  async getDashboard(): Promise<DoctorDashboardResponse> {
    const res = await api.get<ApiResponse<DoctorDashboardResponse>>(
      "/doctors/dashboard" // ✅ FIXED
    );

    return res.data.data;
  }

  /* GET PATIENTS */
  async getPatients(): Promise<readonly PatientMini[]> {
    const res = await api.get<ApiResponse<readonly PatientMini[]>>(
      "/doctors/patients" // ✅ FIXED
    );

    return res.data.data;
  }

  /* GET APPOINTMENTS */
  async getAppointments(): Promise<readonly Appointment[]> {
    const res = await api.get<ApiResponse<readonly Appointment[]>>(
      "/doctors/appointments" // ✅ FIXED
    );

    return res.data.data;
  }
}

/* =========================
   PUBLIC DOCTOR API
========================= */
class DoctorApi {
  async getAllDoctors() {
    const res = await api.get("/doctors"); // already correct
    return res.data.data;
  }
}

/* =========================
   EXPORTS
========================= */
export const doctorApi = new DoctorApi();
export const doctorDashboardApi = new DoctorDashboardApi();