import { getIO } from "./index";
import { getRoom } from "./rooms";

/* =========================
   GENERIC EMITTER
========================= */
export const emitToUser = (
  role: "doctor" | "patient" | "admin",
  userId: string,
  event: string,
  payload: unknown
) => {
  const io = getIO();

  const room = getRoom(role, userId);
  io.to(room).emit(event, payload);
};

/* =========================
   APPOINTMENT EVENTS
========================= */
export const appointmentEvents = {
  created: (doctorId: string, patientId: string, data: unknown) => {
    const io = getIO();

    io.to(getRoom("doctor", doctorId)).emit("appointment:created", data);
    io.to(getRoom("patient", patientId)).emit("appointment:created", data);
  },

  updated: (doctorId: string, patientId: string, data: unknown) => {
    const io = getIO();

    io.to(getRoom("doctor", doctorId)).emit("appointment:updated", data);
    io.to(getRoom("patient", patientId)).emit("appointment:updated", data);
  },

  cancelled: (doctorId: string, patientId: string, data: unknown) => {
    const io = getIO();

    io.to(getRoom("doctor", doctorId)).emit("appointment:cancelled", data);
    io.to(getRoom("patient", patientId)).emit("appointment:cancelled", data);
  },

  completed: (doctorId: string, patientId: string, data: unknown) => {
    const io = getIO();

    io.to(getRoom("doctor", doctorId)).emit("appointment:completed", data);
    io.to(getRoom("patient", patientId)).emit("appointment:completed", data);
  },
};