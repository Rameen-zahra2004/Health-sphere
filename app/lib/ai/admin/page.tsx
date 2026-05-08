"use client";

import AIChatBox from "@/app/component/ai/AIChatBox";

export default function AdminAIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-gray-50 via-white to-gray-100">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-50" />
            </div>

            <div className="leading-tight">
              <h1 className="text-sm font-semibold text-gray-900">
                AI Admin Console
              </h1>
              <p className="text-[11px] text-gray-500">
                System intelligence & administrative control
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-red-500 text-white px-3 py-1 rounded-full shadow-sm">
              ADMIN MODE
            </span>

            <span className="text-[11px] bg-gray-100 text-gray-600 px-3 py-1 rounded-full border">
              Secure Session Active
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-4 py-6">
          {/* ================= CARD WRAPPER ================= */}
          <div className="h-[calc(100vh-92px)] bg-white border shadow-sm rounded-2xl overflow-hidden flex flex-col">
            {/* ================= SYSTEM WARNING BAR ================= */}
            <div className="px-4 py-2 border-b bg-red-50 flex items-center justify-between text-[11px] text-red-600">
              <span>
                ⚠ This AI has elevated access to administrative and system-level
                data
              </span>
              <span className="text-red-500 font-medium">
                Audit logging enabled
              </span>
            </div>

            {/* ================= CHAT AREA ================= */}
            <div className="flex-1 overflow-hidden">
              <AIChatBox mode="admin" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
