"use client";

import { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { fetchDoctorAppointments } from "@/app/Redux/slices/doctorSlice";

interface DoctorSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

export default function DoctorSelect({
  value,
  onChange,
  label = "Select Doctor",
  id = "doctor-select",
}: DoctorSelectProps) {
  const dispatch = useAppDispatch();

  /* ================= STATE ================= */
  const { appointments, listState } = useAppSelector(
    (state) => state.doctorDashboard,
  );

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  /* ================= UNIQUE DOCTORS ================= */
  const doctors = useMemo(() => {
    const map = new Map<string, string>();

    appointments.forEach((appt) => {
      if (appt.doctorId && !map.has(appt.doctorId)) {
        map.set(appt.doctorId, `Doctor ${appt.doctorId.slice(0, 6)}`);
      }
    });

    return Array.from(map.entries()).map(([id, name]) => ({
      _id: id,
      name,
    }));
  }, [appointments]);

  /* ================= UI ================= */
  return (
    <div className="w-full">
      {/* LABEL */}
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {/* SELECT */}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={listState.loading}
        className="w-full border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">
          {listState.loading ? "Loading doctors..." : "Select Doctor"}
        </option>

        {doctors.map((doc) => (
          <option key={doc._id} value={doc._id}>
            {doc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
