"use client";

import { useEffect, useState } from "react";

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  );

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("/api/health");
        if (!res.ok) throw new Error();
        setApiStatus("online");
      } catch {
        setApiStatus("offline");
      }
    };

    checkBackend();
  }, []);

  return (
    <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Search Specialists</h3>

        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            apiStatus === "online"
              ? "bg-green-100 text-green-700"
              : apiStatus === "offline"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          Backend: {apiStatus}
        </span>
      </div>

      <input
        type="text"
        placeholder="Search doctors..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </section>
  );
}
