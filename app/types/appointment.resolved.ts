import type { ID, Status } from "./common";

export interface AdminAppointmentView {
  _id: ID;

  patient: {
    _id: ID;
    firstName: string;
    lastName: string;
  };

  doctor: {
    _id: ID;
    firstName: string;
    lastName: string;
  };

  status: Status;

  date: string;
  time: string;

  createdAt?: string;
  updatedAt?: string;
}