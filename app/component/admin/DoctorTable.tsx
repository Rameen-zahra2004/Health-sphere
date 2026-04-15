"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { fetchDoctorPatients } from "@/app/Redux/slices/doctorSlice";

/* ================= COMPONENT ================= */

export default function DoctorTable() {
  const dispatch = useAppDispatch();

  const { patients, listState } = useAppSelector(
    (state) => state.doctorDashboard,
  );

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchDoctorPatients());
  }, [dispatch]);

  /* ================= LOADING ================= */
  if (listState.loading) {
    return <div className="p-6 text-gray-500">Loading data...</div>;
  }

  /* ================= EMPTY ================= */
  if (!patients.length) {
    return <div className="p-6 text-gray-500">No records found.</div>;
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">
        Patients (Doctor Dashboard)
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-t hover:bg-gray-50">
                {/* NAME */}
                <td className="p-3 font-medium">{patient.name}</td>

                {/* EMAIL */}
                <td className="p-3 text-gray-600">{patient.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
