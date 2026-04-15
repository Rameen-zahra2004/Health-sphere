"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";

import {
  fetchDoctorAppointments,
  updateAppointmentStatusThunk,
  cancelAppointmentThunk,
} from "@/app/Redux/slices/appointmentSlice";

import type { Appointment } from "@/app/lib/api/appointmentApi";

/* ================= TYPES ================= */

type ViewType = "list" | "calendar";
type ButtonColor = "green" | "blue" | "red";
type Status = Appointment["status"];

/* ================= STATUS STYLE ================= */

const getStatusStyles = (status: Status): string => {
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

export default function DoctorAppointmentsPage() {
  const dispatch = useAppDispatch();

  const { appointments, loading, error } = useAppSelector(
    (state) => state.appointments,
  );

  const [view, setView] = useState<ViewType>("list");
  const [filter, setFilter] = useState<Status | "all">("all");

  /* ================= FETCH DOCTOR DATA ================= */

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  /* ================= SAFE APPOINTMENTS ================= */

  const safeAppointments = useMemo<Appointment[]>(() => {
    return Array.isArray(appointments) ? appointments : [];
  }, [appointments]);

  /* ================= FILTER ================= */

  const filteredAppointments = useMemo(() => {
    if (filter === "all") return safeAppointments;
    return safeAppointments.filter((a) => a.status === filter);
  }, [safeAppointments, filter]);

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
      <div className="min-h-screen p-6 space-y-4 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-40 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white border rounded-2xl p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Doctor Appointments
            </h1>
            <p className="text-sm text-gray-500">
              Manage patient appointments efficiently
            </p>
          </div>

          <div className="flex gap-2">
            <ToggleBtn active={view === "list"} onClick={() => setView("list")}>
              List
            </ToggleBtn>

            <ToggleBtn
              active={view === "calendar"}
              onClick={() => setView("calendar")}
            >
              Calendar
            </ToggleBtn>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Stat label="Total" value={stats.total} />
          <Stat label="Pending" value={stats.pending} />
          <Stat label="Confirmed" value={stats.confirmed} />
          <Stat label="Completed" value={stats.completed} />
          <Stat label="Cancelled" value={stats.cancelled} />
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f as Status | "all")}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {f}
              </button>
            ),
          )}
        </div>

        {/* LIST */}
        {view === "list" && (
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border">
                No appointments found
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white border rounded-2xl p-5"
                >
                  {/* INFO */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500">Date & Time</p>

                      <p className="font-semibold text-gray-800">
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
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <ActionButton
                      label="Confirm"
                      color="green"
                      disabled={appointment.status !== "pending"}
                      onClick={() =>
                        dispatch(
                          updateAppointmentStatusThunk({
                            id: appointment._id,
                            status: "confirmed",
                          }),
                        )
                      }
                    />

                    <ActionButton
                      label="Complete"
                      color="blue"
                      disabled={appointment.status !== "confirmed"}
                      onClick={() =>
                        dispatch(
                          updateAppointmentStatusThunk({
                            id: appointment._id,
                            status: "completed",
                          }),
                        )
                      }
                    />

                    <ActionButton
                      label="Cancel"
                      color="red"
                      disabled={appointment.status === "cancelled"}
                      onClick={() =>
                        dispatch(cancelAppointmentThunk(appointment._id))
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded-2xl p-4 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function ActionButton({
  label,
  color,
  onClick,
  disabled,
}: {
  label: string;
  color: ButtonColor;
  onClick: () => void;
  disabled?: boolean;
}) {
  const styles: Record<ButtonColor, string> = {
    green: "bg-emerald-600 hover:bg-emerald-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm rounded-xl text-white transition ${
        styles[color]
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
}
