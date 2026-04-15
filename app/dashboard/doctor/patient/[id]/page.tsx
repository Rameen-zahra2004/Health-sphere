"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { fetchPatients } from "@/app/Redux/slices/patientSlice";
import type { Patient } from "@/app/types/patient";

/* ================= SAFE HELPER ================= */
const safe = (v?: string): string => v ?? "N/A";

export default function PatientDetailPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const params = useParams();
  const patientId = params?.id as string;

  const { patients, loading, error } = useAppSelector((state) => state.patient);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  /* ================= FIND PATIENT ================= */
  const patient: Patient | undefined = patients.find(
    (p) => p._id === patientId,
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-40 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!patient) {
    return <div className="p-6 text-gray-500">Patient not found</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Details</h1>
          <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
        </div>

        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
        >
          ← Back
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Patient Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Info
            label="Full Name"
            value={`${patient.firstName} ${patient.lastName}`}
          />
          <Info label="Email" value={safe(patient.email)} />
          <Info label="Phone" value={safe(patient.phone)} />
          <Info label="Date of Birth" value={safe(patient.dateOfBirth)} />
          <Info label="Gender" value={safe(patient.gender)} />
          <Info label="Blood Type" value={safe(patient.bloodType)} />
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENT ================= */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 border">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
