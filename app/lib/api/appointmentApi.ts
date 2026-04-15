import api from "./api";

/* ================= TYPES ================= */
export interface Appointment {
  _id: string;

  patientId: {
    _id?: string;
    name?: string;
    email?: string;
  } | string;

  doctorId: {
    _id?: string;
    name?: string;
  } | string;

  date: string;
  time: string;
  reason: string;

  status: "pending" | "confirmed" | "completed" | "cancelled";

  createdAt?: string;
  updatedAt?: string;
}
/* ================= DTO ================= */

export interface CreateAppointmentDTO {
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}

/* ================= RESPONSE ================= */

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const extractData = <T>(res: { data: ApiResponse<T> }): T =>
  res.data.data;

/* =========================================================
   PATIENT APPOINTMENTS
========================================================= */

export const getPatientAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get<ApiResponse<Appointment[]>>(
    "/appointments/my"
  );

  return res.data.data ?? [];
};

/* =========================================================
   DOCTOR APPOINTMENTS
========================================================= */

export const getDoctorAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get<ApiResponse<Appointment[]>>(
    "/appointments/doctor"
  );

  return res.data.data ?? [];
};

/* =========================================================
   CREATE APPOINTMENT (PATIENT)
========================================================= */

export const createAppointment = async (
  data: CreateAppointmentDTO
): Promise<Appointment> => {
  const res = await api.post<ApiResponse<Appointment>>(
    "/appointments",
    data
  );

  return extractData(res);
};

/* =========================================================
   CANCEL (PATIENT)
========================================================= */

export const cancelAppointment = async (
  id: string
): Promise<Appointment> => {
  const res = await api.patch<ApiResponse<Appointment>>(
    `/appointments/cancel/${id}`
  );

  return extractData(res);
};

/* =========================================================
   UPDATE STATUS (DOCTOR)
========================================================= */

export const updateAppointmentStatus = async (
  id: string,
  status: Appointment["status"]
): Promise<Appointment> => {
  const res = await api.patch<ApiResponse<Appointment>>(
    `/appointments/status/${id}`,
    { status }
  );

  return extractData(res);
};