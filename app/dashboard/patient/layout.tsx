// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   User,
//   Calendar,
//   FileText,
//   Menu,
//   X,
// } from "lucide-react";

// export default function PatientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [collapsed, setCollapsed] = useState(true);
//   const pathname = usePathname();

//   const isActive = (path: string) => pathname === path;

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* SIDEBAR */}
//       <aside
//         className={`flex flex-col transition-all duration-300 shadow-lg
//         ${collapsed ? "w-20" : "w-64"}
//         bg-linear-to-b from-blue-600 to-blue-500 text-white`}
//       >
//         {/* TOP */}
//         <div className="flex items-center justify-between p-4 border-b border-blue-400/30">
//           {!collapsed && (
//             <div>
//               <h2 className="text-lg font-bold">Patient Panel</h2>
//               <p className="text-xs text-blue-100">Healthcare System</p>
//             </div>
//           )}

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="p-2 rounded-lg hover:bg-white/20 transition"
//           >
//             {collapsed ? <Menu size={18} /> : <X size={18} />}
//           </button>
//         </div>

//         {/* NAV */}
//         <nav className="flex-1 p-3 space-y-2">
//           <SidebarLink
//             href="/dashboard/patient"
//             icon={<LayoutDashboard size={18} />}
//             label="Dashboard"
//             collapsed={collapsed}
//             active={isActive("/dashboard/patient")}
//           />

//           <SidebarLink
//             href="/dashboard/patient/profile"
//             icon={<User size={18} />}
//             label="Profile"
//             collapsed={collapsed}
//             active={isActive("/dashboard/patient/profile")}
//           />

//           <SidebarLink
//             href="/dashboard/patient/appointments"
//             icon={<Calendar size={18} />}
//             label="Appointments"
//             collapsed={collapsed}
//             active={isActive("/dashboard/patient/appointments")}
//           />

//           <SidebarLink
//             href="/dashboard/patient/medical-records"
//             icon={<FileText size={18} />}
//             label="Medical Records"
//             collapsed={collapsed}
//             active={isActive("/dashboard/patient/medical-records")}
//           />
//         </nav>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 p-6 md:p-10 bg-slate-50">{children}</main>
//     </div>
//   );
// }

// /* =======================
//    SIDEBAR LINK (PRO)
// ======================= */
// function SidebarLink({
//   href,
//   icon,
//   label,
//   collapsed,
//   active,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
//   collapsed: boolean;
//   active?: boolean;
// }) {
//   return (
//     <Link
//       href={href}
//       className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
//         ${
//           active
//             ? "bg-white text-blue-600 font-semibold shadow-md"
//             : "text-white/90 hover:bg-white/20 hover:text-white"
//         }`}
//     >
//       <span>{icon}</span>

//       {!collapsed && <span className="text-sm font-medium">{label}</span>}
//     </Link>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Calendar,
  FileText,
  Menu,
  X,
} from "lucide-react";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside
        className={`flex flex-col transition-all duration-300 shadow-lg
        ${collapsed ? "w-20" : "w-64"}
        bg-linear-to-b from-blue-600 to-blue-500 text-white`}
      >
        {/* TOP */}
        <div className="flex items-center justify-between p-4 border-b border-blue-400/30">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold">Patient Panel</h2>
              <p className="text-xs text-blue-100">Healthcare System</p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/20 transition"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink
            href="/dashboard/patient"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            collapsed={collapsed}
            active={isActive("/dashboard/patient")}
          />

          <SidebarLink
            href="/dashboard/patient/profile"
            icon={<User size={18} />}
            label="Profile"
            collapsed={collapsed}
            active={isActive("/dashboard/patient/profile")}
          />

          <SidebarLink
            href="/dashboard/patient/appointments"
            icon={<Calendar size={18} />}
            label="Appointments"
            collapsed={collapsed}
            active={isActive("/dashboard/patient/appointments")}
          />

          <SidebarLink
            href="/dashboard/patient/medical-records"
            icon={<FileText size={18} />}
            label="Medical Records"
            collapsed={collapsed}
            active={isActive("/dashboard/patient/medical-records")}
          />
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}

/* ================= SIDEBAR LINK ================= */
function SidebarLink({
  href,
  icon,
  label,
  collapsed,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
      ${
        active
          ? "bg-white text-blue-600 font-semibold shadow-md"
          : "text-white/90 hover:bg-white/20 hover:text-white"
      }`}
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
    </Link>
  );
}
