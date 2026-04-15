"use client";

import { useState } from "react";
import { Search, Stethoscope, ArrowRight, LogIn } from "lucide-react";

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/40 bg-linear-to-br from-white via-slate-50 to-cyan-50 px-6 py-24 text-center shadow-xl backdrop-blur-xl">
      {/* 🌈 Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-gradient bg-linear-to-r from-cyan-100 via-blue-100 to-indigo-100 opacity-70" />

        <div className="absolute -top-32 left-10 h-96 w-96 animate-float rounded-full bg-cyan-300 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-96 w-96 animate-float-slow rounded-full bg-blue-300 opacity-30 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-5 py-2 text-sm font-medium text-slate-700 backdrop-blur">
          <Stethoscope className="h-4 w-4 text-cyan-600" />
          Smart Healthcare Platform
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
          Healthcare <span className="text-cyan-600">Made Simple</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg text-slate-600">
          A secure, modern healthcare system connecting doctors, patients, and
          administrators. Manage appointments, medical records, and availability
          in one unified platform.
        </p>

        {/* 🔒 Trust Line */}
        <p className="mt-2 text-xs text-slate-500">
          🔒 Secure • Role-based access • Encrypted medical data
        </p>

        {/* 🔍 Search */}
        <div className="mt-10 flex items-center justify-center flex-col">
          <p className="mb-2 text-xs text-slate-500">
            Search by doctor name, specialty, or department
          </p>

          <div className="flex w-full max-w-2xl items-center gap-2 rounded-2xl border bg-white/80 p-2 shadow-lg backdrop-blur transition-all focus-within:ring-2 focus-within:ring-cyan-400 hover:shadow-xl">
            <Search className="ml-3 h-5 w-5 text-slate-500" />

            <input
              type="text"
              placeholder="Search doctor, specialty..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-3 text-slate-800 placeholder:text-slate-400 outline-none"
            />

            <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">
              Submit
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 🔐 LOGIN CTA */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <button className="relative flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl">
            <LogIn className="h-5 w-5" />
            Login to Continue
          </button>

          <p className="mt-3 text-sm text-slate-500">
            Access your dashboard after authentication
          </p>
        </div>

        {/* 🚀 FEATURE HIGHLIGHTS (replaces boring stats) */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Scheduling",
              desc: "Automated appointment system",
            },
            {
              title: "Secure Records",
              desc: "Encrypted patient data",
            },
            {
              title: "Real-time Access",
              desc: "Instant doctor availability",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border bg-white/60 p-5 shadow-sm backdrop-blur transition hover:scale-105"
            >
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
