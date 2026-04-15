export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      {/* HERO */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Support Center
        </h1>
        <p className="text-gray-600 text-base">
          We’re here to help you with any issues related to Health Sphere.
        </p>
      </section>

      {/* GRID */}
      <section className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">📩 Contact Support</h2>
          <p className="text-sm text-gray-600">
            Email us at support@healthsphere.com for account, service, or
            technical help.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">❓ FAQs</h2>
          <p className="text-sm text-gray-600">
            Find answers to common questions about appointments, medical
            records, and dashboard features.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">⚙️ Technical Help</h2>
          <p className="text-sm text-gray-600">
            If something is not working, try refreshing or clearing cache. You
            can also report bugs to our team.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} Health Sphere. All rights reserved.
      </footer>
    </main>
  );
}
