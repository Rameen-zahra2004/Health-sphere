"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";

import {
  fetchDoctors,
  createDoctor,
  deleteDoctor,
} from "@/app/Redux/slices/adminSlice";

import DoctorForm from "@/app/component/admin/DoctorForm";
import type { CreateDoctorDTO } from "@/app/types/doctor";

export default function AdminDoctorsPage() {
  const dispatch = useAppDispatch();

  const { doctors, loading, actionLoading } = useAppSelector(
    (state) => state.admin,
  );

  const [search, setSearch] = useState("");

  /* ================= LOAD DOCTORS ================= */
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  /* ================= FILTER ================= */
  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return doctors;

    return doctors.filter((doc) => {
      return (
        doc?.firstName?.toLowerCase().includes(query) ||
        doc?.lastName?.toLowerCase().includes(query) ||
        doc?.email?.toLowerCase().includes(query) ||
        doc?.specialization?.toLowerCase().includes(query)
      );
    });
  }, [doctors, search]);

  /* ================= CREATE ================= */
  const handleCreate = async (data: CreateDoctorDTO) => {
    try {
      const res = await dispatch(createDoctor(data));

      if (createDoctor.fulfilled.match(res)) {
        dispatch(fetchDoctors());
      }
    } catch (error) {
      console.error("Create doctor failed:", error);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteDoctor(id));
    } catch (error) {
      console.error("Delete doctor failed:", error);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* ================= ADD DOCTOR ================= */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Add New Doctor</h1>

        <DoctorForm
          submitText="Create Doctor"
          loading={actionLoading}
          onSubmit={handleCreate}
        />
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Doctors List</h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors..."
            className="w-full md:w-64 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-gray-500">No doctors found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-600 bg-gray-50">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Specialization</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.map((doc, index) => {
                  // ✅ Guaranteed unique key
                  const uniqueKey = doc?._id || doc?.email || `doctor-${index}`;

                  return (
                    <tr
                      key={uniqueKey}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 text-gray-800 font-medium">
                        {`${doc?.firstName ?? ""} ${doc?.lastName ?? ""}`}
                      </td>

                      <td className="p-3 text-gray-600">{doc?.email ?? "-"}</td>

                      <td className="p-3 text-gray-600">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                          {doc?.specialization ?? "-"}
                        </span>
                      </td>

                      <td className="p-3 flex gap-3">
                        <a
                          href={`/dashboard/admin/doctors/${doc?._id}/edit`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </a>

                        <button
                          onClick={() => doc?._id && handleDelete(doc._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
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
  );
}
