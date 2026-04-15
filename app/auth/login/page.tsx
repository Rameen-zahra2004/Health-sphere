"use client";

import LoginForm from "@/app/component/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      {/* BACKGROUND GLOW EFFECT */}
      <div className="absolute w-125 h-125 bg-blue-500/20 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-100 h-100 bg-green-500/20 blur-3xl rounded-full bottom-10 right-10" />

      {/* CENTER WRAPPER */}
      <div className="relative w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-slate-300">
            Sign in to continue to HealthSphere dashboard
          </p>
        </div>

        {/* FORM CARD WRAPPER */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-2">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
