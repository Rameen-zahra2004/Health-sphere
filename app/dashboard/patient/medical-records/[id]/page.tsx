"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import {
  fetchMyRecords,
  deleteRecord,
} from "@/app/Redux/slices/medicalRecordSlice";

export default function PatientMedicalRecordsPage() {
  const dispatch = useAppDispatch();

  const { records, listState, actionState } = useAppSelector(
    (state) => state.medicalRecords,
  );

  const { loading, error } = listState;
  const { loading: deleting } = actionState;

  useEffect(() => {
    dispatch(fetchMyRecords());
  }, [dispatch]);

  const safeRecords = Array.isArray(records) ? records : [];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          My Medical Records
        </h1>
        <p className="text-sm text-slate-500">
          View your personal health history and reports
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-slate-500">Loading your records...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && safeRecords.length === 0 && (
        <div className="bg-white p-6 rounded-xl border text-slate-500">
          No medical records found yet.
        </div>
      )}

      {/* RECORD LIST */}
      <div className="grid gap-4 mt-4">
        {safeRecords.map((r) => (
          <div
            key={r._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-slate-800">
                {r.disease}
              </h3>

              <button
                onClick={() => dispatch(deleteRecord(r._id))}
                disabled={deleting}
                className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                Delete
              </button>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              <span className="font-medium">Symptoms:</span> {r.symptoms}
            </p>

            <p className="text-sm text-slate-600 mt-2">{r.description}</p>

            <p className="text-xs text-slate-400 mt-3">
              {r.createdAt ? new Date(r.createdAt).toLocaleString() : "No date"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
