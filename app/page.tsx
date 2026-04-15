"use client";

import { useState } from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/Footer";
import Hero from "@/app/component/Hero";
import StatsSection from "@/app/component/StatsSection";
import FeaturesSection from "@/app/component/features";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home as HomeIcon,
  LayoutList,
  Info,
  LifeBuoy,
  LogIn,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-md"
      : "text-slate-700 hover:bg-slate-100";

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r shadow-lg transition-all duration-300 flex flex-col z-50
        ${open ? "w-72" : "w-20"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          {open && (
            <div>
              <h1 className="text-xl font-bold text-slate-900">HealthSphere</h1>
              <p className="text-xs text-slate-500">
                Smart Healthcare Platform
              </p>
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl hover:bg-slate-200 transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* NAVIGATION (SYNCED WITH NAVBAR) */}
        <nav className="flex flex-col gap-2 p-3 text-sm">
          <Link
            href="/"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${isActive(
              "/",
            )}`}
          >
            <HomeIcon className="w-5 h-5" />
            {open && <span>Home</span>}
          </Link>

          <Link
            href="/services"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${isActive(
              "/services",
            )}`}
          >
            <LayoutList className="w-5 h-5" />
            {open && <span>Services</span>}
          </Link>

          <Link
            href="/about"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${isActive(
              "/about",
            )}`}
          >
            <Info className="w-5 h-5" />
            {open && <span>About</span>}
          </Link>

          <Link
            href="/support"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${isActive(
              "/support",
            )}`}
          >
            <LifeBuoy className="w-5 h-5" />
            {open && <span>Support</span>}
          </Link>

          <Link
            href="/auth/login"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${isActive(
              "/auth/login",
            )}`}
          >
            <LogIn className="w-5 h-5" />
            {open && <span>Login</span>}
          </Link>
        </nav>

        {/* FOOTER */}
        {open && (
          <div className="mt-auto p-4 text-xs text-slate-500 border-t">
            © 2026 HealthSphere
          </div>
        )}
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          open ? "ml-72" : "ml-20"
        }`}
      >
        {/* NAVBAR */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b shadow-sm">
          <Navbar />
        </div>

        {/* CONTENT */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <section className="rounded-3xl bg-white/70 backdrop-blur-xl border shadow-xl p-6 md:p-10">
            <Hero />
          </section>

          <section className="rounded-3xl bg-white/60 backdrop-blur-xl border shadow-sm p-6">
            <StatsSection />
          </section>

          <section className="rounded-3xl bg-white/60 backdrop-blur-xl border shadow-sm p-6">
            <FeaturesSection />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
