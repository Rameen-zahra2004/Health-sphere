"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { fetchPatients } from "@/app/Redux/slices/adminSlice";
import type { Patient } from "@/app/Redux/slices/adminSlice";
import { Users, Mail } from "lucide-react";

export default function PatientsPage() {
  const dispatch = useAppDispatch();

  const { patients, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  /* ================= SAFE NORMALIZATION ================= */

  let safePatients: Patient[] = [];

  if (Array.isArray(patients)) {
    safePatients = patients;
  } else if (
    patients &&
    typeof patients === "object" &&
    "patients" in patients &&
    Array.isArray((patients as { patients: Patient[] }).patients)
  ) {
    safePatients = (patients as { patients: Patient[] }).patients;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 shadow-sm">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 blur-3xl opacity-40 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 blur-3xl opacity-40 rounded-full" />

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md">
              <Users size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Patients List
              </h1>
              <p className="text-sm text-slate-500">
                View and manage all registered patients
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-5 flex gap-3 flex-wrap">
            <Stat label="Total Patients" value={safePatients.length} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : error ? (
            <div className="p-10 text-center text-red-500">{error}</div>
          ) : safePatients.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No patients found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {/* HEADER */}
                <thead className="bg-slate-100/70 text-slate-600">
                  <tr>
                    <th className="text-left p-4">Patient</th>
                    <th className="text-left p-4">Email</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {safePatients.map((p, index) => {
                    const key = p._id || p.email || `patient-${index}`;

                    return (
                      <tr
                        key={key}
                        className="border-t hover:bg-blue-50/40 transition"
                      >
                        {/* NAME */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
                              {(p.firstName?.[0] || "P").toUpperCase()}
                            </div>

                            <div className="font-medium text-slate-800">
                              {`${p.firstName ?? ""} ${p.lastName ?? ""}`}
                            </div>
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td className="p-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-slate-400" />
                            {p.email ?? "-"}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   STATS CARD
========================= */
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-2xl px-4 py-3 shadow-sm min-w-35">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

/* =========================
   SKELETON
========================= */
function Skeleton() {
  return <div className="h-10 bg-slate-200/70 rounded-xl animate-pulse" />;
}
