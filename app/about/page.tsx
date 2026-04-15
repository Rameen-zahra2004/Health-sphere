export const metadata = {
  title: "About Us | Health Sphere",
  description:
    "Learn more about Health Sphere, our mission, vision, and how we are transforming healthcare with technology.",
};

export default function AboutPage() {
  const features = [
    {
      title: "Patient-First Approach",
      description:
        "Every feature is designed to improve patient experience, accessibility, and care quality.",
    },
    {
      title: "Secure Healthcare System",
      description:
        "We ensure data privacy, encrypted records, and secure communication between doctors and patients.",
    },
    {
      title: "Smart Technology",
      description:
        "Modern tools and automation that simplify appointments, records, and healthcare workflows.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-blue-600 to-sky-500 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-widest text-white/80">
            About Health Sphere
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
            Smarter Healthcare for Everyone
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            We are building a modern healthcare ecosystem that connects
            patients, doctors, and medical services into one seamless digital
            experience.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          {[
            { label: "Patients Served", value: "10K+" },
            { label: "Verified Doctors", value: "500+" },
            { label: "Appointments", value: "25K+" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat) => (
            <div key={stat.label}>
              <h3 className="text-2xl md:text-3xl font-bold text-indigo-600">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our mission is to simplify healthcare by removing barriers between
            patients and providers. We aim to make healthcare fast, reliable,
            and accessible through technology-driven solutions.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            From booking appointments to managing patient records, everything is
            designed to save time and improve healthcare outcomes.
          </p>
        </div>

        <div className="rounded-2xl bg-linear-to-br  from-indigo-50 to-blue-50 border p-8">
          <h3 className="text-xl font-semibold text-indigo-600">
            Why it matters
          </h3>
          <p className="mt-3 text-gray-600">
            Traditional healthcare systems are slow and disconnected. We fix
            that with a unified digital platform.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Why Choose Health Sphere
          </h2>

          <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
            Built with modern architecture, security, and user experience in
            mind.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {features.map((item) => (
              <div
                key={item.title}
                className="bg-white border rounded-2xl p-6 hover:shadow-xl transition shadow-sm"
              >
                <h3 className="text-lg font-semibold text-indigo-600">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Our Vision</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We envision a world where healthcare is not complicated. Patients
          should be able to access doctors, manage records, and receive care
          without delays or friction.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Your Healthcare Journey Today
          </h2>

          <p className="mt-4 text-white/80">
            Join Health Sphere and experience modern healthcare management.
          </p>

          <button className="mt-8 px-8 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </div>
      </section>
    </main>
  );
}
