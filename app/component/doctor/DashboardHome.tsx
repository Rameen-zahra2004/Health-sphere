"use client";

import { useRouter } from "next/navigation";
import { Stethoscope, Users, CalendarCheck, FileText } from "lucide-react";

interface DashboardCard {
  title: string;
  path: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function DashboardHome() {
  const router = useRouter();

  const cards: DashboardCard[] = [
    {
      title: "Doctors",
      path: "/doctors",
      description: "Manage all doctors",
      icon: <Stethoscope size={24} />,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Patients",
      path: "/patients",
      description: "View patient records",
      icon: <Users size={24} />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Appointments",
      path: "/appointments",
      description: "Manage bookings",
      icon: <CalendarCheck size={24} />,
      gradient: "from-purple-500 to-violet-600",
    },
    {
      title: "Medical Records",
      path: "/records",
      description: "Patient history & reports",
      icon: <FileText size={24} />,
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="w-full">
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((item) => (
          <div
            key={item.title}
            onClick={() => router.push(item.path)}
            className="group relative cursor-pointer"
          >
            {/* CARD */}
            <div
              className="
                relative rounded-2xl p-6 bg-white border border-slate-100
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-2
              "
            >
              {/* ICON */}
              <div
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center text-white
                  mb-4 bg-linear-to-r ${item.gradient}
                  group-hover:scale-110 transition-transform duration-300
                `}
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                {item.description}
              </p>

              {/* FOOTER */}
              <p className="text-xs text-slate-400 mt-4">Open module →</p>
            </div>

            {/* GLOW EFFECT */}
            <div
              className={`
                absolute inset-0 rounded-2xl opacity-0
                group-hover:opacity-100 blur-2xl transition
                bg-linear-to-r ${item.gradient}
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
