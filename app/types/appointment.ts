import type { ID, Status } from "./common";

export interface Appointment {
  _id: ID;

  patient: ID | {
    _id: ID;
    firstName: string;
    lastName: string;
  };

  doctor: ID | {
    _id: ID;
    firstName: string;
    lastName: string;
     doctorId: string;

  };

  date: string;

  status: Status;
  notes?: string;
}