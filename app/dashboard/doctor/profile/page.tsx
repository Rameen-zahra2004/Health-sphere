"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorProfile,
  clearDoctorErrors,
} from "@/app/Redux/slices/doctorSlice";
import type { RootState, AppDispatch } from "@/app/Redux/store/store";

export default function DoctorProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  const profile = useSelector((state: RootState) => state.doctor.profile);
  const loading = useSelector(
    (state: RootState) => state.doctor.profileState.loading,
  );
  const error = useSelector(
    (state: RootState) => state.doctor.profileState.error,
  );

  useEffect(() => {
    dispatch(fetchDoctorProfile());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearDoctorErrors());
    };
  }, [dispatch]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-lg text-gray-500">
          Loading your profile...
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No doctor profile found
      </div>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ================= HEADER CARD ================= */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <Image
            src={profile.profileImage || "/default-doctor.png"}
            alt="Doctor"
            width={110}
            height={110}
            className="rounded-full border-4 border-blue-500 object-cover"
          />

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{fullName}</h1>
            <p className="text-gray-500">{profile.email}</p>

            <p className="mt-2 text-blue-600 font-medium">
              {profile.specialization}
            </p>

            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              {/* Availability */}
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  profile.availability === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {profile.availability}
              </span>

              {/* Verification */}
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  profile.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {profile.isVerified ? "Verified" : "Pending Verification"}
              </span>
            </div>
          </div>
        </div>

        {/* ================= INFO GRID ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT CARD */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Professional Details
            </h2>

            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Experience:</strong> {profile.experience} years
              </p>
              <p>
                <strong>Hospital:</strong> {profile.hospital || "N/A"}
              </p>
              <p>
                <strong>Clinic:</strong> {profile.clinicAddress || "N/A"}
              </p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Consultation Info
            </h2>

            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Fee:</strong>{" "}
                {profile.consultationFee
                  ? `PKR ${profile.consultationFee}`
                  : "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {profile.isVerified ? "Active Doctor" : "Not Verified"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= BIO ================= */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            About Doctor
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {profile.bio || "No bio available"}
          </p>
        </div>
      </div>
    </div>
  );
}
