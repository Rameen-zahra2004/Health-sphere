"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import {
  fetchDoctorById,
  updateDoctorById,
} from "@/app/Redux/slices/adminSlice";

import DoctorForm from "@/app/component/admin/DoctorForm";

import type { CreateDoctorDTO, DoctorFormDTO } from "@/app/types/doctor";
import type { Doctor } from "@/app/Redux/slices/adminSlice";

export default function EditDoctorPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  /* ================= SAFE ID ================= */
  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const { selectedDoctor, actionLoading } = useAppSelector(
    (state) => state.admin,
  );

  /* ================= FETCH DOCTOR ================= */
  useEffect(() => {
    if (!id) return;

    dispatch(fetchDoctorById(id));
  }, [dispatch, id]);

  /* ================= UPDATE ================= */
  const handleUpdate = async (data: CreateDoctorDTO) => {
    if (!id) return;

    try {
      const res = await dispatch(updateDoctorById({ id, data }));

      if (updateDoctorById.fulfilled.match(res)) {
        router.push("/dashboard/admin/doctors");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  /* ================= MAP TO FORM ================= */
  const formData: DoctorFormDTO | null = useMemo(() => {
    if (!selectedDoctor) return null;

    const doctor: Doctor = selectedDoctor;

    return {
      firstName: doctor.firstName ?? "",
      lastName: doctor.lastName ?? "",
      email: doctor.email ?? "",
      password: "", // never preload password
      specialization: doctor.specialization ?? "",
      experience: doctor.experience ?? 0,
      bio: doctor.bio ?? "",
      clinicAddress: doctor.clinicAddress ?? "",
      consultationFee: doctor.consultationFee ?? 0,
    };
  }, [selectedDoctor]);

  /* ================= LOADING ================= */
  if (actionLoading && !selectedDoctor) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4" />
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  /* ================= ERROR STATE ================= */
  if (!id) {
    return <p className="p-6 text-red-500 font-medium">Invalid doctor ID</p>;
  }

  if (!selectedDoctor) {
    return (
      <p className="p-6 text-red-500 font-medium">
        Doctor not found or still loading...
      </p>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Edit Doctor Profile
      </h1>

      {formData && (
        <DoctorForm
          initialData={formData}
          loading={actionLoading}
          submitText="Update Doctor"
          mode="edit"
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
