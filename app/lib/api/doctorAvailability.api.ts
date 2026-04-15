import api from "./api";

/* =========================
   TYPES
========================= */
export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface DoctorAvailability {
  readonly _id: string;

  readonly doctor: string;

  readonly day: WeekDay;

  readonly startTime: string;
  readonly endTime: string;

  readonly isAvailable: boolean;

  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DoctorAvailabilityDTO {
  day: WeekDay;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

/* =========================
   API RESPONSE WRAPPER
========================= */
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/* =========================
   API CLASS
========================= */
class DoctorAvailabilityApi {
  /* ================= GET ALL ================= */
  async getAll(): Promise<readonly DoctorAvailability[]> {
    const res = await api.get<ApiResponse<DoctorAvailability[]>>(
      "/doctor/availability"
    );

    return res.data.data;
  }

  /* ================= CREATE ================= */
  async create(
    data: DoctorAvailabilityDTO
  ): Promise<DoctorAvailability> {
    const res = await api.post<ApiResponse<DoctorAvailability>>(
      "/doctor/availability",
      data
    );

    return res.data.data;
  }

  /* ================= UPDATE ================= */
  async update(
    id: string,
    data: Partial<DoctorAvailabilityDTO>
  ): Promise<DoctorAvailability> {
    const res = await api.put<ApiResponse<DoctorAvailability>>(
      `/doctor/availability/${id}`,
      data
    );

    return res.data.data;
  }

  /* ================= DELETE ================= */
  async delete(id: string): Promise<{ success: boolean }> {
    const res = await api.delete<ApiResponse<{ success: boolean }>>(
      `/doctor/availability/${id}`
    );

    return res.data.data;
  }
}

/* =========================
   SINGLETON EXPORT
========================= */
export const doctorAvailabilityApi =
  new DoctorAvailabilityApi();