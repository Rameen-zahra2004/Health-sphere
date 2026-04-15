"use client";

import RegisterForm from "@/app/component/auth/RegisterForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute w-125 h-125 bg-purple-500/20 blur-3xl rounded-full top-10 right-10" />
      <div className="absolute w-112.5 h-112.5 bg-green-500/20 blur-3xl rounded-full bottom-10 left-10" />

      {/* CENTER WRAPPER */}
      <div className="relative w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-slate-300">
            Join HealthSphere and manage your healthcare easily
          </p>
        </div>

        {/* GLASS CARD WRAPPER */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-2">
          <RegisterForm />
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By signing up, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  );
}
