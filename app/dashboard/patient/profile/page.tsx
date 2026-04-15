"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import {
  fetchPatientProfile,
  updatePatient,
} from "@/app/Redux/slices/patientSlice";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string;
};

export default function PatientProfilePage() {
  const dispatch = useAppDispatch();

  const { profile, loading, error } = useAppSelector((state) => state.patient);

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    profileImage: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchPatientProfile());
  }, [dispatch]);

  /* ================= SYNC ================= */
  useEffect(() => {
    if (!profile) return;

    const image =
      (profile as unknown as { profileImage?: string }).profileImage ?? "";

    setForm({
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      phone: profile.phone ?? "",
      profileImage: image,
    });

    setPreview(image || null);
  }, [profile]);

  /* ================= INPUT ================= */
  const handleChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  /* ================= IMAGE ================= */
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      setForm((prev) => ({ ...prev, profileImage: result }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(null);
      await dispatch(updatePatient(form)).unwrap();
      setSuccess("Profile updated successfully");
    } finally {
      setSaving(false);
    }
  };

  const initials = (form.firstName?.[0] ?? "") + (form.lastName?.[0] ?? "");

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Patient Profile</h1>
          <p className="text-slate-600 mt-1">
            Manage your personal details and account settings
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl border p-6 space-y-6">
          {/* AVATAR */}
          <div className="flex items-center gap-6">
            {preview ? (
              <Image
                src={preview}
                alt="Profile picture"
                width={90}
                height={90}
                className="rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="w-22.5` h-22.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow">
                {initials || "P"}
              </div>
            )}

            <div>
              <label
                htmlFor="profileImage"
                className="text-sm font-semibold text-slate-700"
              >
                Profile Picture
              </label>

              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImage}
                aria-label="Upload profile image"
                className="mt-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>

          {/* STATUS */}
          {loading && (
            <p className="text-sm text-blue-600">Loading profile...</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* FIRST NAME */}
            <div>
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-slate-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange("firstName")}
                autoComplete="given-name"
                aria-label="First name"
                className="w-full mt-1 p-3 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-slate-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange("lastName")}
                autoComplete="family-name"
                aria-label="Last name"
                className="w-full mt-1 p-3 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            </div>

            {/* PHONE */}
            <div className="md:col-span-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                autoComplete="tel"
                aria-label="Phone number"
                className="w-full mt-1 p-3 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
