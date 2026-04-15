"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Stethoscope, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-cyan-600 font-semibold"
      : "text-slate-700 hover:text-cyan-600";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-cyan-600" />
          <span className="text-xl font-bold text-slate-900">HealthSphere</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>

          <Link href="/about" className={isActive("/about")}>
            About
          </Link>

          <Link href="/support" className={isActive("/support")}>
            Support
          </Link>
        </nav>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>

          <Link
            href="/auth/signup"
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 transition"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-3 text-sm">
          <Link href="/" className="block text-slate-700">
            Home
          </Link>

          <Link href="/about" className="block text-slate-700">
            About
          </Link>

          <Link href="/support" className="block text-slate-700">
            Support
          </Link>

          <div className="flex gap-3 pt-3">
            <Link
              href="/auth/login"
              className="flex-1 text-center border rounded-lg py-2 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="flex-1 text-center bg-cyan-600 text-white rounded-lg py-2 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
