"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard/doctor" },
  { label: "Profile", href: "/dashboard/doctor/profile" },
  { label: "Patients", href: "/dashboard/doctor/patients" },
  { label: "Appointments", href: "/dashboard/doctor/appointments" },
  { label: "Availability", href: "/dashboard/doctor/availability" },
];

export default function DoctorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/login");
  };

  /* ================= ACTIVE CHECK (FIXED) ================= */
  const isActiveLink = (href: string, path: string) => {
    if (href === "/dashboard/doctor") {
      return path === href;
    }
    return path.startsWith(href);
  };

  /* ================= MEMOIZED LINKS ================= */
  const links = useMemo(() => NAV_LINKS, []);

  return (
    <aside className="w-64 border-r bg-white p-4 flex h-screen flex-col">
      {/* LOGO */}
      <div className="mb-6 text-2xl font-bold text-blue-600">Doctor Panel</div>

      {/* NAV */}
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = isActiveLink(link.href, pathname);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
}
