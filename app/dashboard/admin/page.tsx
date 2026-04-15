"use client";

import Link from "next/link";
import { Users, UserPlus, CalendarCheck } from "lucide-react";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Doctors",
      href: "/dashboard/admin/doctors",
      icon: UserPlus,
      gradient: "from-blue-500 to-indigo-600",
      desc: "Manage all registered doctors",
    },
    {
      title: "Patients",
      href: "/dashboard/admin/patients",
      icon: Users,
      gradient: "from-emerald-500 to-green-600",
      desc: "View and manage patients",
    },
    {
      title: "Appointments",
      href: "/dashboard/admin/appointment",
      icon: CalendarCheck,
      gradient: "from-purple-500 to-fuchsia-600",
      desc: "Track all appointments",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-8 shadow-sm">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 blur-3xl opacity-40 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 blur-3xl opacity-40 rounded-full" />

          <h1 className="text-4xl font-bold text-slate-800">Admin Dashboard</h1>

          <p className="text-sm text-slate-500 mt-2">
            Manage doctors, patients, and appointments in one place
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-300 p-6"
              >
                {/* glow effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-r ${card.gradient} transition`}
                />

                {/* ICON */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-r ${card.gradient} text-white shadow-md group-hover:scale-110 transition`}
                >
                  <Icon size={22} />
                </div>

                {/* TITLE */}
                <h2 className="mt-4 text-xl font-semibold text-slate-800">
                  {card.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-500 mt-1">{card.desc}</p>

                {/* CTA */}
                <div className="mt-5 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition">
                  Open dashboard →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
