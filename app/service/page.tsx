import type { Metadata } from "next";
import Link from "next/link";
import ServicesGrid from "../component/ServicesGrid";

/**
 * ===============================
 * SEO Metadata
 * ===============================
 */
export const metadata: Metadata = {
  title: "Medical Services | Health Sphere",
  description:
    "Explore a wide range of healthcare services with expert doctors and modern facilities at Health Sphere.",
};

/**
 * ===============================
 * Services Page
 * ===============================
 */
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50">
      {/* ===============================
          HERO (Balanced Center Layout)
      =============================== */}
      <section className="relative flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center max-w-3xl">
          <span className="inline-block mb-5 px-4 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Healthcare Services
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Modern Healthcare <br />
            <span className="text-blue-600">Made Simple & Trusted</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-lg">
            Explore professional medical services designed to give you fast,
            reliable, and expert care whenever you need it.
          </p>
        </div>

        {/* background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-112.5 bg-blue-200 opacity-30 blur-3xl rounded-full -z-10" />
      </section>

      {/* ===============================
          SERVICES SECTION (Equal spacing block)
      =============================== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
            Our Core Medical Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Each service is carefully designed to provide specialized care,
            ensuring accurate diagnosis and effective treatment.
          </p>
        </div>

        {/* Grid */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <ServicesGrid />
        </div>
      </section>

      {/* ===============================
          CTA SECTION (Compact & Balanced)
      =============================== */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-3xl p-10 shadow-lg">
          {/* Left */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Need Guidance?
            </h2>

            <p className="text-blue-100">
              Our medical experts are ready to help you choose the right service
              based on your condition.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row md:justify-end gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition text-center"
            >
              Contact Us
            </Link>

            <Link
              href="/doctors"
              className="border border-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-blue-600 transition text-center"
            >
              Find Doctors
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
