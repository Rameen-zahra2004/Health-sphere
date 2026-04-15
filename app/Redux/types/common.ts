export interface AsyncState {
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/* ===============================
   APPOINTMENT STATUS
=============================== */

export type Status =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";