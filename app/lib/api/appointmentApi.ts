// import api from "./api";

// /* ================= TYPES ================= */
// export interface Appointment {
//   _id: string;

//   patientId: {
//     _id?: string;
//     name?: string;
//     email?: string;
//   } | string;

//   doctorId: {
//     _id?: string;
//     name?: string;
//   } | string;

//   date: string;
//   time: string;
//   reason: string;

//   status: "pending" | "confirmed" | "completed" | "cancelled";

//   createdAt?: string;
//   updatedAt?: string;
// }
// /* ================= DTO ================= */

// export interface CreateAppointmentDTO {
//   doctorId: string;
//   date: string;
//   time: string;
//   reason: string;
// }

// /* ================= RESPONSE ================= */

// interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

// const extractData = <T>(res: { data: ApiResponse<T> }): T =>
//   res.data.data;

// /* =========================================================
//    PATIENT APPOINTMENTS
// ========================================================= */

// export const getPatientAppointments = async (): Promise<Appointment[]> => {
//   const res = await api.get<ApiResponse<Appointment[]>>(
//     "/appointments/my"
//   );

//   return res.data.data ?? [];
// };

// /* =========================================================
//    DOCTOR APPOINTMENTS
// ========================================================= */

// export const getDoctorAppointments = async (): Promise<Appointment[]> => {
//   const res = await api.get<ApiResponse<Appointment[]>>(
//     "/appointments/doctor"
//   );

//   return res.data.data ?? [];
// };

// /* =========================================================
//    CREATE APPOINTMENT (PATIENT)
// ========================================================= */

// export const createAppointment = async (
//   data: CreateAppointmentDTO
// ): Promise<Appointment> => {
//   const res = await api.post<ApiResponse<Appointment>>(
//     "/appointments",
//     data
//   );

//   return extractData(res);
// };

// /* =========================================================
//    CANCEL (PATIENT)
// ========================================================= */

// export const cancelAppointment = async (
//   id: string
// ): Promise<Appointment> => {
//   const res = await api.patch<ApiResponse<Appointment>>(
//     `/appointments/cancel/${id}`
//   );

//   return extractData(res);
// };

// /* =========================================================
//    UPDATE STATUS (DOCTOR)
// ========================================================= */

// export const updateAppointmentStatus = async (
//   id: string,
//   status: Appointment["status"]
// ): Promise<Appointment> => {
//   const res = await api.patch<ApiResponse<Appointment>>(
//     `/appointments/status/${id}`,
//     { status }
//   );

//   return extractData(res);
// };
import api from "./api";
import {
  ApiAppointment,
  Appointment,
  CreateAppointmentDTO,
  mapApiAppointmentToUI,
} from "@/app/types/appointment";

/* ================= RESPONSE WRAPPER ================= */

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const getData = <T>(res: { data: ApiResponse<T> }): T => {
  return res.data.data;
};

/* ================= GET APPOINTMENTS (PATIENT) ================= */

export const getPatientAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get<ApiResponse<ApiAppointment[]>>(
    "/appointments/my"
  );

  const data = getData(res);

  return data.map(mapApiAppointmentToUI);
};

/* ================= GET APPOINTMENTS (DOCTOR) ================= */

export const getDoctorAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get<ApiResponse<ApiAppointment[]>>(
    "/appointments/doctor"
  );

  const data = getData(res);

  return data.map(mapApiAppointmentToUI);
};

/* ================= CREATE APPOINTMENT ================= */

export const createAppointment = async (
  data: CreateAppointmentDTO
): Promise<Appointment> => {
  const res = await api.post<ApiResponse<ApiAppointment>>(
    "/appointments",
    data
  );

  return mapApiAppointmentToUI(getData(res));
};

/* ================= CANCEL APPOINTMENT ================= */

export const cancelAppointment = async (
  id: string
): Promise<Appointment> => {
  const res = await api.patch<ApiResponse<ApiAppointment>>(
    `/appointments/cancel/${id}`
  );

  return mapApiAppointmentToUI(getData(res));
};

/* ================= UPDATE STATUS ================= */

export const updateAppointmentStatus = async (
  id: string,
  status: ApiAppointment["status"]
): Promise<Appointment> => {
  const res = await api.patch<ApiResponse<ApiAppointment>>(
    `/appointments/status/${id}`,
    { status }
  );

  return mapApiAppointmentToUI(getData(res));
};