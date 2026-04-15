"use client";

import { useRouter } from "next/navigation";
import { User, Users, Calendar, Clock, Stethoscope } from "lucide-react";

export default function DoctorDashboardHome() {
  const router = useRouter();

  const cards = [
    {
      title: "Profile",
      path: "/dashboard/doctor/profile",
      icon: User,
      color: "from-blue-500 to-indigo-600",
      desc: "Manage your personal profile",
    },
    {
      title: "Patients",
      path: "/dashboard/doctor/patient",
      icon: Users,
      color: "from-emerald-500 to-green-600",
      desc: "View and manage patients",
    },
    {
      title: "Appointments",
      path: "/dashboard/doctor/appointment",
      icon: Calendar,
      color: "from-purple-500 to-fuchsia-600",
      desc: "Check scheduled visits",
    },
    {
      title: "Availability",
      path: "/dashboard/doctor/availability",
      icon: Clock,
      color: "from-orange-500 to-amber-600",
      desc: "Set your working hours",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-6 space-y-10">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border bg-white/60 backdrop-blur-xl shadow-lg p-8 flex items-center gap-5">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 blur-3xl opacity-40 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 blur-3xl opacity-40 rounded-full" />

        <div className="p-4 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md">
          <Stethoscope size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Doctor Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage patients, appointments and your medical workflow
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              onClick={() => router.push(card.path)}
              className="group relative cursor-pointer rounded-3xl border bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* TOP GRADIENT BAR */}
              <div className={`h-2 bg-linear-to-r ${card.color}`} />

              {/* GLOW EFFECT */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-r ${card.color} transition`}
              />

              <div className="p-6 space-y-4 relative">
                {/* ICON */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-r ${card.color} text-white shadow-md group-hover:scale-110 transition`}
                >
                  <Icon size={22} />
                </div>

                {/* TITLE */}
                <h2 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">
                  {card.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-500">{card.desc}</p>

                {/* BUTTON STYLE INDICATOR */}
                <div className="flex items-center text-xs text-slate-400 group-hover:text-slate-600 transition">
                  Click to open →
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
