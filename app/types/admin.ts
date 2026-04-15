import type { Patient } from "./patient";
import type { Doctor } from "./doctor";
import type { AdminAppointmentView } from "../types/appointment.resolved";

export type AdminTableRow =
  | { type: "patient"; data: Patient }
  | { type: "doctor"; data: Doctor }
  | { type: "appointment"; data: AdminAppointmentView };