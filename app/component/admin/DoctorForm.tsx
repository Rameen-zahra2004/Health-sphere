// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
// import { createDoctor, clearAdminState } from "@/app/Redux/slices/adminSlice";
// import type { DoctorFormDTO, CreateDoctorDTO } from "@/app/types/doctor";

// /* ================= PROPS ================= */

// interface Props {
//   initialData?: DoctorFormDTO;
//   submitText?: string;
//   loading?: boolean;
//   mode?: "create" | "edit";
//   onSubmit?: (data: CreateDoctorDTO) => Promise<void>;
// }

// const defaultForm: DoctorFormDTO = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   specialization: "",
//   experience: 0,
//   bio: "",
//   clinicAddress: "",
//   consultationFee: 0,
// };

// export default function DoctorForm({
//   initialData,
//   submitText = "Create Doctor",
//   mode = "create",
//   onSubmit,
// }: Props) {
//   const dispatch = useAppDispatch();

//   const { actionLoading, error } = useAppSelector((state) => state.admin);

//   const [form, setForm] = useState<DoctorFormDTO>(initialData ?? defaultForm);

//   const [localError, setLocalError] = useState<string | null>(null);

//   /* ================= HANDLE CHANGE ================= */

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         name === "experience" || name === "consultationFee"
//           ? Number(value)
//           : value,
//     }));
//   };

//   /* ================= VALIDATION ================= */

//   const validate = () => {
//     if (!form.firstName) return "First name required";
//     if (!form.lastName) return "Last name required";
//     if (!form.email) return "Email required";
//     if (!form.specialization) return "Specialization required";
//     return null;
//   };

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const err = validate();
//     if (err) return setLocalError(err);

//     setLocalError(null);

//     const payload: CreateDoctorDTO = {
//       firstName: form.firstName,
//       lastName: form.lastName,
//       email: form.email,
//       password: form.password || "default123",
//       specialization: form.specialization,
//       experience: form.experience,
//       bio: form.bio || "",
//       clinicAddress: form.clinicAddress || "",
//       consultationFee: form.consultationFee || 0,
//     };

//     try {
//       if (onSubmit) {
//         await onSubmit(payload); // 🔥 external handler (page control)
//       } else {
//         await dispatch(createDoctor(payload)); // 🔥 default redux action
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= CLEANUP ================= */

//   useEffect(() => {
//     return () => {
//       dispatch(clearAdminState());
//     };
//   }, [dispatch]);

//   /* ================= UI ================= */

//   return (
//     <div className="flex justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-5 border"
//       >
//         {/* HEADER */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             {mode === "edit" ? "Update Doctor" : "Create Doctor"}
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill doctor information carefully
//           </p>
//         </div>

//         {/* ERRORS */}
//         {(localError || error) && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
//             {localError || error}
//           </div>
//         )}

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             className="input"
//           />

//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             className="input"
//           />
//         </div>

//         <input
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="input"
//         />

//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="input"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="specialization"
//             value={form.specialization}
//             onChange={handleChange}
//             placeholder="Specialization"
//             className="input"
//           />

//           <input
//             name="experience"
//             type="number"
//             value={form.experience}
//             onChange={handleChange}
//             placeholder="Experience"
//             className="input"
//           />
//         </div>

//         <textarea
//           name="bio"
//           value={form.bio}
//           onChange={handleChange}
//           placeholder="Bio"
//           rows={4}
//           className="input"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="clinicAddress"
//             value={form.clinicAddress}
//             onChange={handleChange}
//             placeholder="Clinic Address"
//             className="input"
//           />

//           <input
//             name="consultationFee"
//             type="number"
//             value={form.consultationFee}
//             onChange={handleChange}
//             placeholder="Fee"
//             className="input"
//           />
//         </div>

//         {/* BUTTON */}
//         <button
//           disabled={actionLoading}
//           className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-lg disabled:opacity-60"
//         >
//           {actionLoading ? "Processing..." : submitText}
//         </button>

//         {/* STYLES */}
//         <style jsx>{`
//           .input {
//             width: 100%;
//             padding: 10px 12px;
//             border: 1px solid #e5e7eb;
//             border-radius: 10px;
//             color: #111827;
//             outline: none;
//           }

//           .input:focus {
//             border-color: #3b82f6;
//             box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
//           }
//         `}</style>
//       </form>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { createDoctor, clearAdminState } from "@/app/Redux/slices/adminSlice";
import type { DoctorFormDTO, CreateDoctorDTO } from "@/app/types/doctor";

/* ================= PROPS ================= */

interface Props {
  initialData?: DoctorFormDTO;
  submitText?: string;
  loading?: boolean;
  mode?: "create" | "edit";
  onSubmit?: (data: CreateDoctorDTO) => Promise<void>;
}

const defaultForm: DoctorFormDTO = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  specialization: "",
  experience: 0,
  bio: "",
  clinicAddress: "",
  consultationFee: 0,
};

export default function DoctorForm({
  initialData,
  submitText = "Create Doctor",
  mode = "create",
  onSubmit,
}: Props) {
  const dispatch = useAppDispatch();
  const { actionLoading, error } = useAppSelector((state) => state.admin);

  /* ================= ✅ CLEAN STATE INIT ================= */
  const [form, setForm] = useState<DoctorFormDTO>(() =>
    mode === "edit" && initialData ? initialData : defaultForm,
  );

  const [localError, setLocalError] = useState<string | null>(null);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "experience" || name === "consultationFee"
          ? Number(value)
          : value,
    }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    if (!form.firstName.trim()) return "First name required";
    if (!form.lastName.trim()) return "Last name required";
    if (!form.email.trim()) return "Email required";
    if (!form.specialization.trim()) return "Specialization required";
    return null;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err = validate();
    if (err) return setLocalError(err);

    setLocalError(null);

    const payload: CreateDoctorDTO = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password || "default123",
      specialization: form.specialization,
      experience: form.experience,
      bio: form.bio || "",
      clinicAddress: form.clinicAddress || "",
      consultationFee: form.consultationFee || 0,
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await dispatch(createDoctor(payload));
      }

      /* ================= ✅ RESET AFTER CREATE ================= */
      if (mode === "create") {
        setForm(defaultForm);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      dispatch(clearAdminState());
    };
  }, [dispatch]);

  /* ================= UI ================= */

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-5 border border-gray-100"
      >
        {/* HEADER */}
        <div className="border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            {mode === "edit" ? "Update Doctor Profile" : "Create Doctor"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill doctor information carefully
          </p>
        </div>

        {/* ERRORS */}
        {(localError || error) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {localError || error}
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input"
          />
        </div>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="input"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="input"
          />

          <input
            name="experience"
            type="number"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="input"
          />
        </div>

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
          rows={4}
          className="input"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="clinicAddress"
            value={form.clinicAddress}
            onChange={handleChange}
            placeholder="Clinic Address"
            className="input"
          />

          <input
            name="consultationFee"
            type="number"
            value={form.consultationFee}
            onChange={handleChange}
            placeholder="Fee"
            className="input"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={actionLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-lg disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {actionLoading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Processing...
            </>
          ) : (
            submitText
          )}
        </button>

        {/* STYLES */}
        <style jsx>{`
          .input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            color: #111827;
            outline: none;
            transition: all 0.2s;
          }

          .input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          }
        `}</style>
      </form>
    </div>
  );
}
