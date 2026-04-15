"use client";

import Link from "next/link";

/* =========================
   PATIENT DASHBOARD PAGE
========================= */

export default function PatientDashboardPage() {
  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Patient Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your health, appointments, and medical records
          </p>
        </div>

        {/* BACK TO MAIN PAGE */}
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
        >
          ← Back to Home
        </Link>
      </div>

      {/* QUICK ACTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Book Appointment"
          desc="Schedule a visit with a doctor"
          href="/dashboard/patient/appointments/book"
        />

        <DashboardCard
          title="My Appointments"
          desc="View and manage your bookings"
          href="/dashboard/patient/appointments"
        />

        <DashboardCard
          title="Medical Records"
          desc="Access your health history"
          href="/dashboard/patient/medical-records"
        />

        <DashboardCard
          title="Profile Settings"
          desc="Update your personal information"
          href="/dashboard/patient/profile"
        />
      </div>
    </div>
  );
}

/* =========================
   DASHBOARD CARD COMPONENT
========================= */

function DashboardCard({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200"
    >
      <h2 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600">
        {title}
      </h2>

      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </Link>
  );
}
