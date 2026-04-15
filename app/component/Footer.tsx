"use client";

import { Stethoscope, Mail, Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-linear-to-br from-white via-slate-50 to-cyan-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <Stethoscope className="text-cyan-600" />
              HealthSphere
            </div>

            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              A modern healthcare management platform connecting doctors,
              patients, and administrators with secure and seamless digital
              healthcare solutions.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-600 cursor-pointer">Dashboard</li>
              <li className="hover:text-cyan-600 cursor-pointer">Doctors</li>
              <li className="hover:text-cyan-600 cursor-pointer">Patients</li>
              <li className="hover:text-cyan-600 cursor-pointer">
                Appointments
              </li>
            </ul>
          </div>

          {/* CONTACT / SECURITY */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Platform Info
            </h3>

            <div className="space-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-cyan-600" />
                Secure Role-Based System
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-600" />
                support@healthsphere.com
              </div>

              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-400" />
                Built for better healthcare
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-slate-200" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-slate-700">HealthSphere</span>.
            All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Made with care for modern healthcare systems
          </p>
        </div>
      </div>
    </footer>
  );
}
