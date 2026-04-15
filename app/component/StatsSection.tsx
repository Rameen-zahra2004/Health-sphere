"use client";

import { useEffect, useState } from "react";
import { Stethoscope, CalendarCheck, HeartPulse } from "lucide-react";
import api from "@/app/lib/api/api";

/* ======================= */
type StatsResponse = {
  doctorsCount: number;
  appointmentsCount: number;
  satisfactionRate: number;
};

type Stats = {
  doctors: number;
  appointments: number;
  satisfaction: number;
};

export default function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    doctors: 0,
    appointments: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get<StatsResponse>("/stats");

        const data = res.data;

        setStats({
          doctors: data.doctorsCount ?? 0,
          appointments: data.appointmentsCount ?? 0,
          satisfaction: data.satisfactionRate ?? 0,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    fetchStats();
  }, []);

  const items = [
    {
      label: "Doctors Listed",
      value: `${stats.doctors.toLocaleString()}+`,
      icon: Stethoscope,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Appointments Booked",
      value: `${stats.appointments.toLocaleString()}+`,
      icon: CalendarCheck,
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Patient Satisfaction",
      value: `${stats.satisfaction}%`,
      icon: HeartPulse,
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="relative mt-12 grid gap-6 md:grid-cols-3">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200 opacity-30 blur-3xl" />
      </div>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r ${item.color} text-white shadow-md`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
