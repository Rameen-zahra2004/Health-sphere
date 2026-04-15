"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { registerUser } from "@/app/Redux/store/auth/authThunk";
import { clearAuthError } from "@/app/Redux/slices/authSlice";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  /* ================= STRICT VALIDATION ================= */
  const isDisabled =
    loading ||
    !form.firstName.trim() ||
    !form.lastName.trim() ||
    !form.email.trim() ||
    form.password.length < 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) dispatch(clearAuthError());

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= REGISTER ================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    const result = await dispatch(
      registerUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      }),
    );

    if (registerUser.fulfilled.match(result)) {
      const { token, user } = result.payload;

      /* ================= STORE AUTH ================= */
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      /* ================= RESET FORM ================= */
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      /* ================= STRICT ROLE CHECK ================= */
      const role = user?.role;

      if (!role) return;

      if (role === "admin") {
        router.replace("/dashboard/admin");
      } else if (role === "doctor") {
        router.replace("/dashboard/doctor");
      } else {
        router.replace("/dashboard/patient");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 space-y-5"
        >
          {/* HEADER */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-sm text-slate-300">
              Join HealthSphere and manage your health easily
            </p>
          </div>

          {/* NAME */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300">First Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full pl-10 p-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300">Last Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full pl-10 p-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs text-slate-300">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 p-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-slate-300">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className="w-full pl-10 pr-10 p-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-3 text-slate-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 p-2 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 rounded-xl font-semibold transition-all
              ${
                isDisabled
                  ? "bg-white/10 text-slate-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/30"
              }
            `}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* LOGIN */}
          <p className="text-center text-sm text-slate-300">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-green-400 font-semibold hover:text-green-300"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
