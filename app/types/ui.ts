/* ================= IMPORTS ================= */
import { LucideIcon } from "lucide-react";

/* ================= FEATURES ================= */

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

/* ================= STAT TYPES ================= */

export interface StatItem {
  label: string;
  value: string;
}

/* ================= API RESPONSE TYPE ================= */

export interface StatsResponse {
  doctorsCount: number;
  appointmentsCount: number;
  satisfactionRate: number;
}

/* ================= NORMALIZED UI TYPE ================= */

export interface NormalizedStats {
  doctorsListed: string;
  appointmentsBooked: string;
  patientSatisfaction: string;
}

/* ================= STATIC STATS DATA (OPTIONAL UI FALLBACK) ================= */

export const statsData: StatItem[] = [
  { label: "Doctors Listed", value: "1,200+" },
  { label: "Appointments Booked", value: "35K+" },
  { label: "Patient Satisfaction", value: "98%" },
];

/* ================= MAPPER (API → UI) ================= */

export const mapStatsToUI = (data: StatsResponse): StatItem[] => {
  return [
    {
      label: "Doctors Listed",
      value: `${data.doctorsCount}+`,
    },
    {
      label: "Appointments Booked",
      value: `${data.appointmentsCount}+`,
    },
    {
      label: "Patient Satisfaction",
      value: `${data.satisfactionRate}%`,
    },
  ];
};