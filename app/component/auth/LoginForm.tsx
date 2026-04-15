"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { loginUser } from "@/app/Redux/store/auth/authThunk";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = !email || !password || loading;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      const { user } = result.payload;

      // ========================
      // ADMIN
      // ========================
      if (user.role === "admin") {
        router.push("/dashboard/admin");
        return;
      }

      // ========================
      // DOCTOR
      // ========================
      if (user.role === "doctor") {
        router.push("/dashboard/doctor");
        return;
      }

      // ========================
      // PATIENT FLOW (IMPORTANT FIX)
      // ========================
      if (user.role === "patient") {
        if (!user.patientId) {
          router.push("/dashboard/patient/profile");
        } else {
          router.push("/dashboard/patient");
        }
        return;
      }

      // fallback
      router.push("/dashboard");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          aria-label="Login form"
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 space-y-6"
        >
          {/* HEADER */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-slate-300">
              Sign in to access your dashboard
            </p>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-slate-200">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-label="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-slate-200">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-label="Password"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-3 text-slate-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div
              role="alert"
              className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 p-2 rounded-xl text-center"
            >
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isDisabled}
            aria-busy={loading}
            aria-disabled={isDisabled}
            aria-label="Sign in to your account"
            className={`w-full py-3 rounded-xl font-semibold transition-all
    ${
      isDisabled
        ? "bg-white/10 text-slate-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
