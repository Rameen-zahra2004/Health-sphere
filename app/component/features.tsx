"use client";

import { useMemo } from "react";
import {
  Stethoscope,
  CalendarCheck,
  FileText,
  Activity,
  ShieldCheck,
  Brain,
} from "lucide-react";

export default function FeaturesSection() {
  const featuresData = useMemo(
    () => [
      {
        title: "Doctor Search & Specialization",
        description:
          "Search doctors by specialty, experience, and availability in real time.",
        icon: Stethoscope,
      },
      {
        title: "Smart Diagnosis System",
        description:
          "AI-assisted diagnosis support for faster and more accurate decisions.",
        icon: Brain,
      },
      {
        title: "Appointment Management",
        description:
          "Schedule, reschedule, and manage appointments seamlessly.",
        icon: CalendarCheck,
      },
      {
        title: "Medical Records System",
        description:
          "Secure digital patient records accessible anytime, anywhere.",
        icon: FileText,
      },
      {
        title: "Live Health Monitoring",
        description:
          "Track patient vitals and health status in real-time dashboards.",
        icon: Activity,
      },
      {
        title: "Secure & Compliant System",
        description:
          "End-to-end encrypted healthcare data with role-based access control.",
        icon: ShieldCheck,
      },
    ],
    [],
  );

  return (
    <section id="features" className="mt-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-900">
          Platform Capabilities
        </h2>
        <p className="mt-2 text-slate-600">
          A complete modern healthcare management system built for doctors,
          patients, and clinics.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuresData.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* glow hover effect */}
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-linear-to-r from-cyan-50 via-blue-50 to-indigo-50" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-cyan-100 group-hover:text-cyan-600">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
