"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { fetchPatients } from "@/app/Redux/slices/patientSlice";
import type { Patient } from "@/app/types/patient";
import { Search, UserRound, Mail } from "lucide-react";

const safe = (v?: string): string => v ?? "N/A";

export default function PatientListPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { patients, loading, error } = useAppSelector((state) => state.patient);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const typedPatients = patients as Patient[];

  const filtered = useMemo(() => {
    return typedPatients.filter((p) =>
      `${p.firstName} ${p.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [typedPatients, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading patients...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Patients</h1>
            <p className="text-sm text-slate-500">
              Manage and view all registered patients
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((patient) => (
            <div
              key={patient._id}
              className="group bg-white/70 backdrop-blur-xl border rounded-3xl shadow-sm hover:shadow-xl transition p-5 relative overflow-hidden"
            >
              {/* soft glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-r from-blue-400 to-purple-500 transition" />

              {/* avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <UserRound size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {patient.firstName} {patient.lastName}
                  </p>

                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Mail size={14} />
                    {safe(patient.email)}
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="flex justify-between items-center mt-6">
                <span className="text-xs text-slate-400">
                  ID: {patient._id?.slice(0, 6)}...
                </span>

                <button
                  onClick={() =>
                    router.push(`/dashboard/doctor/patients/${patient._id}`)
                  }
                  className="px-4 py-1.5 rounded-xl text-sm font-medium text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-105 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No patients found.
          </div>
        )}
      </div>
    </div>
  );
}
