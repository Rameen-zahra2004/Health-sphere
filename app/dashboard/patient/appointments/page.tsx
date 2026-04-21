// "use client";

// import { useEffect, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";

// import {
//   fetchPatientAppointments,
//   cancelAppointmentThunk,
// } from "@/app/Redux/slices/appointmentSlice";

// import type { Appointment } from "@/app/lib/api/appointmentApi";

// /* ================= STATUS STYLE ================= */

// const getStatusStyles = (status: Appointment["status"]): string => {
//   switch (status) {
//     case "pending":
//       return "bg-amber-50 text-amber-700 border-amber-200";
//     case "confirmed":
//       return "bg-emerald-50 text-emerald-700 border-emerald-200";
//     case "completed":
//       return "bg-sky-50 text-sky-700 border-sky-200";
//     case "cancelled":
//       return "bg-rose-50 text-rose-700 border-rose-200";
//     default:
//       return "bg-gray-50 text-gray-600 border-gray-200";
//   }
// };

// /* ================= PAGE ================= */

// export default function PatientAppointmentsPage() {
//   const dispatch = useAppDispatch();

//   const { appointments, loading, error } = useAppSelector(
//     (state) => state.appointments,
//   );

//   // ✅ FIX: always safe memo (no re-render dependency issues)
//   const safeAppointments = useMemo<Appointment[]>(() => {
//     return Array.isArray(appointments) ? appointments : [];
//   }, [appointments]);

//   /* ================= FETCH ================= */

//   useEffect(() => {
//     dispatch(fetchPatientAppointments());
//   }, [dispatch]);

//   /* ================= STATS ================= */

//   const stats = useMemo(() => {
//     return {
//       total: safeAppointments.length,
//       pending: safeAppointments.filter((a) => a.status === "pending").length,
//       confirmed: safeAppointments.filter((a) => a.status === "confirmed")
//         .length,
//       completed: safeAppointments.filter((a) => a.status === "completed")
//         .length,
//       cancelled: safeAppointments.filter((a) => a.status === "cancelled")
//         .length,
//     };
//   }, [safeAppointments]);

//   /* ================= LOADING ================= */

//   if (loading) {
//     return (
//       <div className="p-6 space-y-4 animate-pulse">
//         <div className="h-6 w-1/3 bg-gray-200 rounded" />
//         <div className="h-40 bg-gray-200 rounded-2xl" />
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* HEADER */}
//         <div className="bg-white border rounded-2xl p-5">
//           <h1 className="text-2xl font-bold">My Appointments</h1>
//           <p className="text-sm text-gray-500">View and manage your bookings</p>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           <Stat label="Total" value={stats.total} />
//           <Stat label="Pending" value={stats.pending} />
//           <Stat label="Confirmed" value={stats.confirmed} />
//           <Stat label="Completed" value={stats.completed} />
//           <Stat label="Cancelled" value={stats.cancelled} />
//         </div>

//         {/* LIST */}
//         <div className="space-y-4">
//           {safeAppointments.length === 0 ? (
//             <p className="text-gray-500">No appointments found.</p>
//           ) : (
//             safeAppointments.map((appointment) => (
//               <div
//                 key={appointment._id}
//                 className="bg-white border rounded-2xl p-5"
//               >
//                 {/* INFO */}
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-sm text-gray-500">Date & Time</p>

//                     <p className="font-semibold">
//                       {new Date(appointment.date).toLocaleDateString()} •{" "}
//                       {appointment.time}
//                     </p>

//                     <p className="text-sm text-gray-600 mt-2">
//                       {appointment.reason}
//                     </p>
//                   </div>

//                   <span
//                     className={`px-3 py-1 text-xs border rounded-full ${getStatusStyles(
//                       appointment.status,
//                     )}`}
//                   >
//                     {appointment.status}
//                   </span>
//                 </div>

//                 {/* ACTIONS */}
//                 <div className="mt-4 flex gap-2">
//                   <button
//                     onClick={() =>
//                       dispatch(cancelAppointmentThunk(appointment._id))
//                     }
//                     disabled={appointment.status === "cancelled"}
//                     className="px-4 py-2 text-sm rounded-xl bg-rose-600 text-white disabled:opacity-40"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= STAT COMPONENT ================= */

// function Stat({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="bg-white border rounded-2xl p-4">
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="text-xl font-bold text-sky-700">{value}</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { createAppointmentThunk } from "@/app/Redux/slices/appointmentSlice";
import { doctorApi } from "@/app/lib/api/doctorApi";
import type { DoctorAdminView } from "@/app/types/doctor";

type FormError = string | null;

export default function AppointmentBookingPage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.appointments.loading);

  /* ================= STATE ================= */
  const [doctors, setDoctors] = useState<DoctorAdminView[]>([]);
  const [doctorId, setDoctorId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const [error, setError] = useState<FormError>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* ================= LOAD DOCTORS ================= */
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await doctorApi.getAllDoctors();
        setDoctors(data);
      } catch {
        setError("Failed to load doctors. Please refresh page.");
      }
    };

    loadDoctors();
  }, []);

  const selectedDoctor = doctors.find((d) => d._id === doctorId);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!doctorId || !date || !time || !reason.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      await dispatch(
        createAppointmentThunk({
          doctorId,
          date,
          time,
          reason,
        }),
      ).unwrap();

      setDoctorId("");
      setDate("");
      setTime("");
      setReason("");

      setSuccess("Appointment booked successfully 🎉");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to book appointment");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600">
            Schedule your consultation with a verified doctor
          </p>
        </div>

        {/* ERROR / SUCCESS */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-100 text-green-700 p-3 rounded-xl text-sm">
            {success}
          </div>
        )}

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 space-y-5"
        >
          {/* DOCTOR */}
          <div>
            <label
              htmlFor="doctor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Doctor
            </label>

            <select
              id="doctor"
              name="doctor"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
              aria-label="Select doctor"
            >
              <option value="">Choose a doctor</option>

              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.firstName} {doc.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* DOCTOR PREVIEW */}
          {selectedDoctor && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs text-gray-500">Selected Doctor</p>
              <p className="font-semibold text-gray-800">
                Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
              </p>
            </div>
          )}

          {/* DATE */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Appointment Date
            </label>

            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              aria-label="Appointment date"
            />
          </div>

          {/* TIME */}
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Appointment Time
            </label>

            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
              aria-label="Appointment time"
            />
          </div>

          {/* REASON */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason for Visit
            </label>

            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
              placeholder="Describe your symptoms..."
              required
              aria-label="Reason for appointment"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-md disabled:opacity-50"
          >
            {loading ? "Booking Appointment..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
