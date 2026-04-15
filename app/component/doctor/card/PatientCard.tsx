import React from "react";
import AppCard from "./AppCard";
import Link from "next/link";

/* =========================
   TYPES
========================= */

interface Patient {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: "male" | "female" | "other";
}

interface PatientCardProps {
  patient: Patient;
}

/* =========================
   COMPONENT
========================= */

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <AppCard>
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">{patient.name}</h2>

        <p className="text-gray-600">{patient.email}</p>

        {patient.phone && (
          <p>
            <span className="font-medium">Phone:</span> {patient.phone}
          </p>
        )}

        {typeof patient.age === "number" && (
          <p>
            <span className="font-medium">Age:</span> {patient.age}
          </p>
        )}

        {patient.gender && (
          <p>
            <span className="font-medium">Gender:</span> {patient.gender}
          </p>
        )}

        {/* ACTION */}
        <Link
          href={`/doctor/patients/${patient._id}`}
          className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </AppCard>
  );
}
