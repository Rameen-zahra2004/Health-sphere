"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { fetchPatients } from "@/app/Redux/slices/patientSlice";

import type { Patient } from "@/app/types/patient";

/* ================= COMPONENT ================= */

export default function PatientDetailsPage() {
  const dispatch = useAppDispatch();
  const params = useParams();

  const patientId = params?.id as string;

  /* ================= REDUX STATE ================= */
  const { patients, loading, error } = useAppSelector((state) => state.patient);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  /* ================= FIND PATIENT ================= */
  const patient: Patient | undefined = useMemo(() => {
    return patients.find((p: Patient) => p._id === patientId);
  }, [patients, patientId]);

  /* ================= STATES ================= */
  if (loading) {
    return <p className="p-6">Loading patient details...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Error: {error}</p>;
  }

  if (!patient) {
    return <p className="p-6 text-red-500">Patient not found</p>;
  }

  /* ================= SAFE DATA ================= */
  const fullName = `${patient.firstName ?? ""} ${patient.lastName ?? ""}`;
  const address = patient.address;
  const emergency = patient.emergencyContact;

  /* ================= UI ================= */
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold">Patient Details</h1>

      {/* ================= BASIC INFO ================= */}
      <div className="space-y-3">
        <Info label="Name" value={fullName || "N/A"} />
        <Info label="Email" value={patient.email || "N/A"} />
        <Info label="Phone" value={patient.phone || "N/A"} />
        <Info label="Gender" value={patient.gender || "N/A"} />
        <Info label="Date of Birth" value={patient.dateOfBirth || "N/A"} />
        <Info label="Blood Type" value={patient.bloodType || "N/A"} />
      </div>

      {/* ================= ADDRESS ================= */}
      <div className="pt-4 border-t">
        <p className="text-gray-500">Address</p>
        <p>
          {address
            ? `${address.street ?? ""}, ${address.city ?? ""}, ${
                address.state ?? ""
              }, ${address.country ?? ""}`
            : "N/A"}
        </p>
      </div>

      {/* ================= EMERGENCY ================= */}
      <div className="pt-4 border-t">
        <h2 className="text-lg font-semibold mb-2">Emergency Contact</h2>

        {emergency ? (
          <>
            <p>
              {emergency.name ?? "N/A"} ({emergency.relationship ?? "N/A"})
            </p>
            <p>{emergency.phone ?? "N/A"}</p>
          </>
        ) : (
          <p>N/A</p>
        )}
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="pt-6 border-t">
        <h2 className="text-lg font-semibold mb-3">Medical Actions</h2>

        <div className="flex flex-wrap gap-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            View History
          </button>

          <button className="bg-green-600 text-white px-3 py-1 rounded">
            New Prescription
          </button>

          <button className="bg-purple-600 text-white px-3 py-1 rounded">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INFO COMPONENT ================= */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
