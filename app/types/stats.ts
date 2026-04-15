/* ================= UI STAT CARD ================= */

export interface StatItem {
  label: string;
  value: string;
}

/* ================= STATIC DASHBOARD STATS (UI) ================= */

export const statsData: StatItem[] = [
  { label: "Doctors Listed", value: "1,200+" },
  { label: "Appointments Booked", value: "35K+" },
  { label: "Patient Satisfaction", value: "98%" },
];

/* ================= API RESPONSE TYPE ================= */

export interface StatsResponse {
  doctorsCount: number;
  appointmentsCount: number;
  satisfactionRate: number;
}

/* ================= OPTIONAL: NORMALIZED UI MAPPER ================= */

export interface NormalizedStats {
  doctorsListed: string;
  appointmentsBooked: string;
  patientSatisfaction: string;
}

/* helper (optional but production useful) */
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