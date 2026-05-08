// "use client";

// import { useState, useEffect } from "react";
// import Navbar from "@/app/component/Navbar";
// import Footer from "@/app/component/Footer";
// import Hero from "@/app/component/Hero";
// import StatsSection from "@/app/component/StatsSection";
// import FeaturesSection from "@/app/component/features";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   Home as HomeIcon,
//   LayoutList,
//   Info,
//   LifeBuoy,
//   LogIn,
//   Menu,
//   X,
//   Send,
//   Sparkles,
// } from "lucide-react";

// import { useAIChat } from "@/app/hooks/useAIChat";

// export default function HomePage() {
//   const [open, setOpen] = useState(false);
//   const [aiOpen, setAiOpen] = useState(false);
//   const [input, setInput] = useState("");

//   // 🤖 NEW: AI onboarding prompt
//   const [showPrompt, setShowPrompt] = useState(false);

//   const pathname = usePathname();
//   const { messages, sendMessage, loading } = useAIChat("public");

//   const isActive = (path: string) =>
//     pathname === path
//       ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-md"
//       : "text-slate-700 hover:bg-slate-100";

//   // ✅ show prompt only once
//   useEffect(() => {
//     const seen = localStorage.getItem("ai_prompt_seen");

//     if (!seen) {
//       const timer = setTimeout(() => {
//         setShowPrompt(true);
//       }, 500); // 👈 prevents render cascade

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const closePrompt = () => {
//     localStorage.setItem("ai_prompt_seen", "true");
//     setShowPrompt(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
//       {/* ================= SIDEBAR (UNCHANGED) ================= */}
//       <aside
//         className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r shadow-lg transition-all duration-300 flex flex-col z-50
//         ${open ? "w-72" : "w-20"}`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           {open && (
//             <div>
//               <h1 className="text-xl font-bold text-slate-900">HealthSphere</h1>
//               <p className="text-xs text-slate-500">
//                 Smart Healthcare Platform
//               </p>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={() => setOpen(!open)}
//             className="p-2 rounded-xl hover:bg-slate-200 transition"
//             aria-label="Toggle sidebar"
//           >
//             {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </button>
//         </div>

//         <nav className="flex flex-col gap-2 p-3 text-sm">
//           <Link
//             href="/"
//             className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/")}`}
//           >
//             <HomeIcon className="w-5 h-5" />
//             {open && <span>Home</span>}
//           </Link>

//           <Link
//             href="/services"
//             className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/services")}`}
//           >
//             <LayoutList className="w-5 h-5" />
//             {open && <span>Services</span>}
//           </Link>

//           <Link
//             href="/about"
//             className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/about")}`}
//           >
//             <Info className="w-5 h-5" />
//             {open && <span>About</span>}
//           </Link>

//           <Link
//             href="/support"
//             className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/support")}`}
//           >
//             <LifeBuoy className="w-5 h-5" />
//             {open && <span>Support</span>}
//           </Link>

//           <Link
//             href="/auth/login"
//             className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/auth/login")}`}
//           >
//             <LogIn className="w-5 h-5" />
//             {open && <span>Login</span>}
//           </Link>
//         </nav>

//         {open && (
//           <div className="mt-auto p-4 text-xs text-slate-500 border-t">
//             © 2026 HealthSphere
//           </div>
//         )}
//       </aside>

//       {/* ================= MAIN AREA ================= */}
//       <div
//         className={`flex flex-col flex-1 transition-all duration-300 ${open ? "ml-72" : "ml-20"}`}
//       >
//         {/* NAVBAR */}
//         <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b shadow-sm">
//           <Navbar />
//         </div>

//         {/* CONTENT */}
//         <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
//           <section className="rounded-3xl bg-white/70 backdrop-blur-xl border shadow-xl p-6 md:p-10">
//             <Hero />
//           </section>

//           <section className="rounded-3xl bg-white/60 backdrop-blur-xl border shadow-sm p-6">
//             <StatsSection />
//           </section>

//           <section className="rounded-3xl bg-white/60 backdrop-blur-xl border shadow-sm p-6">
//             <FeaturesSection />
//           </section>
//         </main>

//         <Footer />
//       </div>

//       {/* ================= AI WIDGET ================= */}
//       <div className="fixed bottom-5 right-5 z-50">
//         {!aiOpen && (
//           <button
//             type="button"
//             onClick={() => setAiOpen(true)}
//             className="bg-black text-white p-3 rounded-full shadow-lg"
//             aria-label="Open AI assistant"
//           >
//             <Sparkles className="w-5 h-5" />
//           </button>
//         )}

//         {aiOpen && (
//           <div className="w-80 h-105 bg-white border shadow-2xl rounded-2xl flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-3 border-b bg-slate-50">
//               <div className="flex items-center gap-2 text-sm font-semibold">
//                 <Sparkles className="w-4 h-4" />
//                 AI Assistant
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setAiOpen(false)}
//                 aria-label="Close AI"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
//               {messages.length === 0 && (
//                 <p className="text-xs text-gray-400 text-center mt-10">
//                   How can I help you today?
//                 </p>
//               )}

//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`text-xs p-2 rounded-lg max-w-[85%]
//                   ${msg.role === "user" ? "bg-black text-white ml-auto" : "bg-white border"}`}
//                 >
//                   {msg.content}
//                 </div>
//               ))}

//               {loading && (
//                 <p className="text-xs text-gray-500">AI is typing...</p>
//               )}
//             </div>

//             <div className="p-2 border-t flex gap-2">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Ask AI..."
//                 className="flex-1 border rounded-full px-3 py-1 text-xs"
//               />

//               <button
//                 type="button"
//                 aria-label="Close AI assistant"
//                 onClick={() => {
//                   if (!input.trim()) return;
//                   sendMessage(input);
//                   setInput("");
//                 }}
//                 className="bg-black text-white px-3 py-1 rounded-full"
//               >
//                 <Send className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ================= AI ONBOARDING PROMPT ================= */}
//       {showPrompt && (
//         <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//           <div className="w-105 bg-white rounded-2xl shadow-2xl p-6 space-y-4">
//             <div className="flex items-center gap-2 font-semibold">
//               🤖 HealthSphere AI Assistant
//             </div>

//             <p className="text-sm text-gray-600">
//               Need help? You can ask our AI anything about health, symptoms,
//               services, or bookings.
//             </p>

//             <div className="text-xs text-gray-500 space-y-1">
//               <p>Try asking:</p>
//               <ul className="list-disc ml-5">
//                 <li>What are flu symptoms?</li>
//                 <li>How to book appointment?</li>
//                 <li>What services are available?</li>
//               </ul>
//             </div>

//             <div className="flex gap-2 pt-2">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowPrompt(false);
//                   setAiOpen(true);
//                 }}
//                 className="flex-1 bg-black text-white py-2 rounded-lg text-sm"
//               >
//                 Ask AI
//               </button>

//               <button
//                 type="button"
//                 onClick={closePrompt}
//                 className="flex-1 bg-gray-100 py-2 rounded-lg text-sm"
//               >
//                 Maybe later
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
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
  Send,
  Sparkles,
} from "lucide-react";

import { useAIChat } from "@/app/hooks/useAIChat";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const { messages, sendMessage, loading } = useAIChat("public");

  const isActive = (path: string) =>
    pathname === path
      ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-md"
      : "text-slate-700 hover:bg-slate-100";

  /* ================= EFFECTS ================= */

  useEffect(() => {
    const seen = localStorage.getItem("ai_prompt_seen");
    if (!seen) {
      const timer = setTimeout(() => setShowPrompt(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ================= HANDLERS ================= */

  const closePrompt = () => {
    localStorage.setItem("ai_prompt_seen", "true");
    setShowPrompt(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input;
    setInput("");

    try {
      await sendMessage(text);
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r shadow-lg transition-all duration-300 flex flex-col z-50 ${
          open ? "w-72" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {open && (
            <div>
              <h1 className="text-xl font-bold">HealthSphere</h1>
              <p className="text-xs text-slate-500">
                Smart Healthcare Platform
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
            className="p-2 rounded-xl hover:bg-slate-200"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-3 text-sm">
          <Link
            href="/"
            className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/")}`}
          >
            <HomeIcon className="w-5 h-5" />
            {open && "Home"}
          </Link>

          <Link
            href="/services"
            className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/services")}`}
          >
            <LayoutList className="w-5 h-5" />
            {open && "Services"}
          </Link>

          <Link
            href="/about"
            className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/about")}`}
          >
            <Info className="w-5 h-5" />
            {open && "About"}
          </Link>

          <Link
            href="/support"
            className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/support")}`}
          >
            <LifeBuoy className="w-5 h-5" />
            {open && "Support"}
          </Link>

          <Link
            href="/auth/login"
            className={`flex items-center gap-3 p-3 rounded-xl ${isActive("/auth/login")}`}
          >
            <LogIn className="w-5 h-5" />
            {open && "Login"}
          </Link>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className={`flex flex-col flex-1 ${open ? "ml-72" : "ml-20"}`}>
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b shadow-sm">
          <Navbar />
        </div>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10 space-y-10">
          <section className="rounded-3xl bg-white/70 border shadow-xl p-6">
            <Hero />
          </section>

          <section className="rounded-3xl bg-white/60 border shadow-sm p-6">
            <StatsSection />
          </section>

          <section className="rounded-3xl bg-white/60 border shadow-sm p-6">
            <FeaturesSection />
          </section>
        </main>

        <Footer />
      </div>

      {/* ================= AI WIDGET ================= */}
      <div className="fixed bottom-5 right-5 z-50">
        {!aiOpen && (
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            aria-label="Open AI assistant"
            title="Open AI assistant"
            className="bg-black text-white p-3 rounded-full shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        )}

        {aiOpen && (
          <div className="w-80 h-105 bg-white border shadow-2xl rounded-2xl flex flex-col overflow-hidden">
            {/* HEADER */}
            <div className="flex items-center justify-between p-3 border-b bg-slate-50">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI Assistant
              </div>

              <button
                type="button"
                onClick={() => setAiOpen(false)}
                aria-label="Close AI assistant"
                title="Close AI assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-linear-to-b from-slate-50 to-white">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                  How can I help you today?
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`text-sm px-3 py-2 rounded-2xl max-w-[75%]
                    ${
                      msg.role === "user"
                        ? "bg-black text-white"
                        : "bg-white border text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                  <span>AI is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-2 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask AI..."
                disabled={loading}
                className="flex-1 border rounded-full px-3 py-1 text-xs disabled:opacity-50"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={loading}
                aria-label="Send message"
                title="Send message"
                className="bg-black text-white px-3 py-1 rounded-full disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= PROMPT ================= */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-96 bg-white rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="font-semibold">🤖 HealthSphere AI Assistant</div>

            <p className="text-sm text-gray-600">
              Ask anything about health, services, or bookings.
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setAiOpen(true);
                  setShowPrompt(false);
                }}
                className="flex-1 bg-black text-white py-2 rounded-lg text-sm"
              >
                Ask AI
              </button>

              <button
                type="button"
                onClick={closePrompt}
                className="flex-1 bg-gray-100 py-2 rounded-lg text-sm"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
