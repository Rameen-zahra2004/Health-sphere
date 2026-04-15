// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// const navItems = [
//   { label: "Dashboard", href: "/dashboard/doctor" },
//   { label: "Profile", href: "/dashboard/doctor/profile" },
//   { label: "Patients", href: "/dashboard/doctor/patients" },
//   { label: "Appointments", href: "/dashboard/doctor/appointments" },
//   { label: "Availability", href: "/dashboard/doctor/availability" },
// ];

// export default function DoctorLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`fixed md:static z-50 w-64 bg-white border-r h-full p-5 transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <h1 className="text-xl font-bold mb-8 text-slate-800">
//           🏥 Doctor Panel
//         </h1>

//         <nav className="space-y-2">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`block px-4 py-2 rounded-lg transition font-medium
//                   ${
//                     isActive
//                       ? "bg-blue-600 text-white"
//                       : "text-slate-600 hover:bg-slate-100"
//                   }`}
//               >
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <div className="flex-1 md:ml-64">
//         {/* TOP BAR (MOBILE ONLY) */}
//         <div className="md:hidden p-4 bg-white border-b">
//           <button
//             onClick={() => setOpen(!open)}
//             className="px-3 py-2 bg-blue-600 text-white rounded"
//           >
//             Menu
//           </button>
//         </div>

//         {/* PAGE CONTENT */}
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/doctor" },
  { label: "Profile", href: "/dashboard/doctor/profile" },
  { label: "Patients", href: "/dashboard/doctor/patients" },
  { label: "Appointments", href: "/dashboard/doctor/appointments" },
  { label: "Availability", href: "/dashboard/doctor/availability" },
];

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ================= BACKDROP (MOBILE) ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static z-50 w-64 bg-white border-r h-full p-5
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h1 className="text-xl font-bold mb-8 text-slate-800">
          🏥 Doctor Panel
        </h1>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)} // ✅ FIX: no useEffect needed
                className={`block px-4 py-2 rounded-lg transition font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 md:ml-64">
        {/* ================= TOP BAR (MOBILE ONLY) ================= */}
        <div className="sticky top-0 z-30 flex items-center justify-between md:hidden p-4 bg-white border-b">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="p-2 rounded-md bg-blue-600 text-white"
            aria-label="Open menu"
            title="Open menu"
          >
            <Menu size={20} />
          </button>

          <h2 className="font-semibold text-slate-700">Doctor Panel</h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-md text-slate-600"
            aria-label="Close menu"
            title="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
