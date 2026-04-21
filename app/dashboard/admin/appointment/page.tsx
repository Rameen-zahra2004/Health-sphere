// "use client";

// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
// import { fetchAppointments } from "@/app/Redux/slices/adminSlice";
// import type { Appointment } from "@/app/Redux/slices/adminSlice";
// import { CalendarDays } from "lucide-react";

// export default function AppointmentsPage() {
//   const dispatch = useAppDispatch();

//   const { appointments, loading, error } = useAppSelector(
//     (state) => state.admin,
//   );

//   useEffect(() => {
//     dispatch(fetchAppointments());
//   }, [dispatch]);

//   const safeAppointments: Appointment[] = Array.isArray(appointments)
//     ? appointments
//     : [];

//   const getStatusStyle = (status: Appointment["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-50 text-yellow-700 border-yellow-200";
//       case "confirmed":
//         return "bg-blue-50 text-blue-700 border-blue-200";
//       case "completed":
//         return "bg-green-50 text-green-700 border-green-200";
//       case "cancelled":
//         return "bg-red-50 text-red-700 border-red-200";
//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* HEADER */}
//         <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 shadow-sm">
//           <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 blur-3xl opacity-40 rounded-full" />
//           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 blur-3xl opacity-40 rounded-full" />

//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md">
//               <CalendarDays size={22} />
//             </div>

//             <div>
//               <h1 className="text-3xl font-bold text-slate-800">
//                 Appointments Management
//               </h1>
//               <p className="text-sm text-slate-500">
//                 Monitor and manage all doctor-patient appointments
//               </p>
//             </div>
//           </div>

//           {/* QUICK STATS */}
//           <div className="mt-5 flex gap-3 flex-wrap">
//             <Stat label="Total" value={safeAppointments.length} />
//             <Stat
//               label="Pending"
//               value={
//                 safeAppointments.filter((a) => a.status === "pending").length
//               }
//             />
//             <Stat
//               label="Completed"
//               value={
//                 safeAppointments.filter((a) => a.status === "completed").length
//               }
//             />
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
//           {loading ? (
//             <div className="p-10 text-center text-slate-500">
//               Loading appointments...
//             </div>
//           ) : error ? (
//             <div className="p-10 text-center text-red-500">{error}</div>
//           ) : safeAppointments.length === 0 ? (
//             <div className="p-10 text-center text-slate-500">
//               No appointments found
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 {/* HEADER */}
//                 <thead className="bg-slate-100/70 text-slate-600">
//                   <tr>
//                     <th className="p-4 text-left">Doctor</th>
//                     <th className="p-4 text-left">Patient</th>
//                     <th className="p-4 text-left">Date</th>
//                     <th className="p-4 text-left">Status</th>
//                   </tr>
//                 </thead>

//                 {/* BODY */}
//                 <tbody>
//                   {safeAppointments.map((app) => (
//                     <tr
//                       key={app._id}
//                       className="border-t hover:bg-blue-50/40 transition"
//                     >
//                       <td className="p-4 font-medium text-slate-700">
//                         {app.doctorId}
//                       </td>

//                       <td className="p-4 text-slate-600">{app.patientId}</td>

//                       <td className="p-4 text-slate-600">
//                         {app.date ? new Date(app.date).toLocaleString() : "-"}
//                       </td>

//                       <td className="p-4">
//                         <span
//                           className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(
//                             app.status,
//                           )}`}
//                         >
//                           {app.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    SMALL STAT CARD
// ========================= */
// function Stat({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-2xl px-4 py-2 shadow-sm min-w-30">
//       <p className="text-xs text-slate-500">{label}</p>
//       <p className="text-lg font-bold text-blue-600">{value}</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { fetchAppointments } from "@/app/Redux/slices/adminSlice";

import type { Appointment } from "@/app/types/appointment";

import { CalendarDays } from "lucide-react";

import { getSocket } from "@/app/lib/socket/socket";
import {
  socketAppointmentCreated,
  socketAppointmentUpdated,
  socketAppointmentCancelled,
  socketAppointmentCompleted,
} from "@/app/Redux/slices/appointmentSlice";

/* ================= SAFE NAME ================= */

/* ================= DATE FORMAT ================= */

const formatDate = (date?: string): string => {
  if (!date) return "-";

  try {
    return new Intl.DateTimeFormat("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return "-";
  }
};

/* ================= STATUS STYLE ================= */

const getStatusStyle = (status: Appointment["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "confirmed":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

/* ================= STAT COMPONENT ================= */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-2xl px-4 py-2 shadow-sm min-w-30">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-blue-600">{value}</p>
    </div>
  );
}

/* ================= PAGE ================= */

export default function AppointmentsPage() {
  const dispatch = useAppDispatch();

  const { appointments, loading, error } = useAppSelector(
    (state) => state.admin,
  );

  /* ================= FETCH ================= */

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  /* ================= SOCKET ================= */

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("appointment-created", (data) => {
      dispatch(socketAppointmentCreated(data));
    });

    socket.on("appointment-updated", (data) => {
      dispatch(socketAppointmentUpdated(data));
    });

    socket.on("appointment-completed", (data) => {
      dispatch(socketAppointmentCompleted(data));
    });

    socket.on("appointment-cancelled", (id) => {
      dispatch(socketAppointmentCancelled(id));
    });

    return () => {
      socket.off("appointment-created");
      socket.off("appointment-updated");
      socket.off("appointment-completed");
      socket.off("appointment-cancelled");
    };
  }, [dispatch]);

  /* ================= SAFE DATA ================= */

  const safeAppointments = useMemo<Appointment[]>(() => {
    return Array.isArray(appointments) ? appointments : [];
  }, [appointments]);

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    let pending = 0;
    let completed = 0;

    for (const a of safeAppointments) {
      if (a.status === "pending") pending++;
      if (a.status === "completed") completed++;
    }

    return {
      total: safeAppointments.length,
      pending,
      completed,
    };
  }, [safeAppointments]);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white">
              <CalendarDays size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Appointments Management
              </h1>
              <p className="text-sm text-slate-500">
                Monitor all doctor-patient appointments
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-5 flex gap-3 flex-wrap">
            <Stat label="Total" value={stats.total} />
            <Stat label="Pending" value={stats.pending} />
            <Stat label="Completed" value={stats.completed} />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading appointments...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-500">
              {typeof error === "string" ? error : "Something went wrong"}
            </div>
          ) : safeAppointments.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No appointments found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100/70 text-slate-600">
                  <tr>
                    <th className="p-4 text-left">Doctor</th>
                    <th className="p-4 text-left">Patient</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {safeAppointments.map((app) => (
                    <tr
                      key={app._id}
                      className="border-t hover:bg-blue-50/40 transition"
                    >
                      <td className="p-4 font-medium text-slate-700">
                        {app.doctor.name}
                      </td>

                      <td className="p-4 text-slate-600">{app.patient.name}</td>

                      <td className="p-4 text-slate-600">
                        {formatDate(app.date)}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(
                            app.status,
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
