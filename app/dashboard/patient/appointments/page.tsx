"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";

import {
  fetchPatientAppointments,
  cancelAppointmentThunk,
} from "@/app/Redux/slices/appointmentSlice";

import type { Appointment } from "@/app/lib/api/appointmentApi";

/* ================= STATUS STYLE ================= */

const getStatusStyles = (status: Appointment["status"]): string => {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "confirmed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "completed":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "cancelled":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

/* ================= PAGE ================= */

export default function PatientAppointmentsPage() {
  const dispatch = useAppDispatch();

  const { appointments, loading, error } = useAppSelector(
    (state) => state.appointments,
  );

  // ✅ FIX: always safe memo (no re-render dependency issues)
  const safeAppointments = useMemo<Appointment[]>(() => {
    return Array.isArray(appointments) ? appointments : [];
  }, [appointments]);

  /* ================= FETCH ================= */

  useEffect(() => {
    dispatch(fetchPatientAppointments());
  }, [dispatch]);

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    return {
      total: safeAppointments.length,
      pending: safeAppointments.filter((a) => a.status === "pending").length,
      confirmed: safeAppointments.filter((a) => a.status === "confirmed")
        .length,
      completed: safeAppointments.filter((a) => a.status === "completed")
        .length,
      cancelled: safeAppointments.filter((a) => a.status === "cancelled")
        .length,
    };
  }, [safeAppointments]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-40 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white border rounded-2xl p-5">
          <h1 className="text-2xl font-bold">My Appointments</h1>
          <p className="text-sm text-gray-500">View and manage your bookings</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Stat label="Total" value={stats.total} />
          <Stat label="Pending" value={stats.pending} />
          <Stat label="Confirmed" value={stats.confirmed} />
          <Stat label="Completed" value={stats.completed} />
          <Stat label="Cancelled" value={stats.cancelled} />
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {safeAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            safeAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white border rounded-2xl p-5"
              >
                {/* INFO */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>

                    <p className="font-semibold">
                      {new Date(appointment.date).toLocaleDateString()} •{" "}
                      {appointment.time}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {appointment.reason}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs border rounded-full ${getStatusStyles(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      dispatch(cancelAppointmentThunk(appointment._id))
                    }
                    disabled={appointment.status === "cancelled"}
                    className="px-4 py-2 text-sm rounded-xl bg-rose-600 text-white disabled:opacity-40"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STAT COMPONENT ================= */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded-2xl p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold text-sky-700">{value}</p>
    </div>
  );
}
