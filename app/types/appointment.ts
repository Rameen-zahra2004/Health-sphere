// import type { Appointment as BackendAppointment } from "@/app/lib/api/appointmentApi";

// /* ================= UI USER TYPE ================= */

// export interface UserRef {
//   _id: string;
//   name: string;
//   email?: string;
// }

// /* ================= UI APPOINTMENT ================= */

// export interface Appointment {
//   _id: string;

//   patient: UserRef | string;
//   doctor: UserRef | string;

//   date: string;
//   time?: string;
//   reason?: string;

//   status: "pending" | "confirmed" | "completed" | "cancelled";

//   createdAt?: string;
//   updatedAt?: string;
// }

// /* ================= HELPER ================= */

// const mapUser = (u: BackendAppointment["patientId"]): UserRef => ({
//   _id: u._id,
//   name: `${u.firstName} ${u.lastName}`, // ✅ FIX HERE
//   email: u.email,
// });

// /* ================= MAPPER ================= */

// export const mapApiAppointmentToUI = (
//   a: BackendAppointment
// ): Appointment => {
//   return {
//     _id: a._id,

//     patient: mapUser(a.patientId),   // ✅ FIXED
//     doctor: mapUser(a.doctorId),     // ✅ FIXED

//     date: a.date,
//     time: a.time,
//     reason: a.reason,

//     status: a.status,

//     createdAt: a.createdAt,
//     updatedAt: a.updatedAt,
//   };
// };
/* ================= BASE USER ================= */

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

/* ================= API MODEL (BACKEND RAW) ================= */

export interface ApiAppointment {
  _id: string;

  patientId: User;
  doctorId: User;

  date: string;
  time: string;
  reason: string;

  status: "pending" | "confirmed" | "completed" | "cancelled";

  createdAt?: string;
  updatedAt?: string;
}

/* ================= UI MODEL (FRONTEND CLEAN) ================= */

export interface Appointment {
  _id: string;

  patient: {
    _id: string;
    name: string;
    email?: string;
  };

  doctor: {
    _id: string;
    name: string;
    email?: string;
  };

  date: string;
  time: string;
  reason: string;

  status: ApiAppointment["status"];

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

/* ================= MAPPER (ONLY PLACE) ================= */

export const mapApiAppointmentToUI = (
  a: ApiAppointment
): Appointment => {
  return {
    _id: a._id,

    patient: {
      _id: a.patientId._id,
      name: `${a.patientId.firstName} ${a.patientId.lastName}`,
      email: a.patientId.email,
    },

    doctor: {
      _id: a.doctorId._id,
      name: `${a.doctorId.firstName} ${a.doctorId.lastName}`,
      email: a.doctorId.email,
    },

    date: a.date,
    time: a.time,
    reason: a.reason,

    status: a.status,

    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  };
};