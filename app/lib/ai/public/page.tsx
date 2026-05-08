"use client";

import AIChatBox from "@/app/component/ai/AIChatBox";

export default function PublicAIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-gray-50 via-white to-gray-100">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
            <h1 className="text-sm font-semibold tracking-tight">
              AI Assistant
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
              Public Mode
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-4 py-6">
          {/* CARD WRAPPER (professional SaaS feel) */}
          <div className="h-[calc(100vh-90px)] bg-white border shadow-sm rounded-2xl overflow-hidden flex flex-col">
            {/* AI CHAT */}
            <AIChatBox mode="public" />
          </div>
        </div>
      </main>
    </div>
  );
}
