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
