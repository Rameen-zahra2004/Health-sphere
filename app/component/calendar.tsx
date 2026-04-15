"use client";

import { useState, useMemo } from "react";

/* ===============================
   SAFE LOCAL TYPE (FIXED)
=============================== */

type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Appointment {
  _id: string;
  date: string;
  status: AppointmentStatus;
}

/* ===============================
   PROPS
=============================== */

interface CalendarProps {
  appointments: Appointment[];
}

/* ===============================
   HELPERS
=============================== */

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-400";
    case "confirmed":
      return "bg-green-500";
    case "completed":
      return "bg-blue-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

/* ===============================
   COMPONENT
=============================== */

export default function Calendar({ appointments }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  /* ===============================
     GROUP APPOINTMENTS BY DATE
  =============================== */

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();

    for (const appt of appointments) {
      const key = new Date(appt.date).toDateString();

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(appt);
    }

    return map;
  }, [appointments]);

  /* ===============================
     NAVIGATION
  =============================== */

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  /* ===============================
     RENDER DAYS
  =============================== */

  const cells: JSX.Element[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = date.toDateString();
    const dayAppointments = appointmentsByDate.get(key) || [];

    cells.push(
      <div
        key={day}
        className="border rounded-xl p-2 min-h-24 bg-white hover:shadow-sm transition"
      >
        <p className="text-sm font-medium mb-1">{day}</p>

        <div className="flex flex-col gap-1">
          {dayAppointments.slice(0, 3).map((appt) => (
            <div
              key={appt._id}
              className={`text-xs text-white px-2 py-1 rounded ${getStatusColor(
                appt.status,
              )}`}
            >
              {appt.status}
            </div>
          ))}

          {dayAppointments.length > 3 && (
            <span className="text-xs text-gray-500">
              +{dayAppointments.length - 3} more
            </span>
          )}
        </div>
      </div>,
    );
  }

  /* ===============================
     UI
  =============================== */

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 rounded-lg border hover:bg-gray-100"
        >
          ←
        </button>

        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={nextMonth}
          className="px-3 py-1 rounded-lg border hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2">{cells}</div>
    </div>
  );
}
