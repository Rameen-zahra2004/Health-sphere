"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import {
  fetchDoctorProfile,
  updateDoctorProfile,
} from "@/app/Redux/slices/doctorSlice";

import DoctorForm from "@/app/component/admin/DoctorForm";

import type {
  CreateDoctorDTO,
  DoctorFormDTO,
  DoctorAdminView,
} from "@/app/types/doctor";

export default function EditDoctorPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  /* =========================
     STATE (FIXED)
  ========================= */
  const { profile, profileState } = useAppSelector(
    (state) => state.doctorDashboard,
  );

  /* =========================
     FETCH PROFILE
  ========================= */
  useEffect(() => {
    dispatch(fetchDoctorProfile());
  }, [dispatch]);

  /* =========================
     UPDATE HANDLER
  ========================= */
  const handleUpdate = async (data: CreateDoctorDTO) => {
    try {
      await dispatch(updateDoctorProfile(data)).unwrap();
      router.push("/dashboard/admin/doctors");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  /* =========================
     MAP DATA → FORM
  ========================= */
  const mapDoctorToForm = (doctor: DoctorAdminView): DoctorFormDTO => ({
    firstName: doctor.firstName ?? "",
    lastName: doctor.lastName ?? "",
    email: doctor.email ?? "",
    password: "", // never prefill password
    specialization: doctor.specialization ?? "",
    experience: doctor.experience ?? 0,
    bio: doctor.bio ?? "",
    clinicAddress: doctor.clinicAddress ?? "",
    consultationFee: doctor.consultationFee ?? 0,
  });

  /* =========================
     UI STATES
  ========================= */
  if (profileState.loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!profile) {
    return <p className="p-6 text-red-500">Doctor not found</p>;
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Doctor Profile</h1>

      <DoctorForm
        initialData={mapDoctorToForm(profile as DoctorAdminView)}
        loading={profileState.loading}
        submitText="Update Doctor"
        onSubmit={handleUpdate}
      />
    </div>
  );
}
