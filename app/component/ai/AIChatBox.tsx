// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useAIChat } from "../../hooks/useAIChat";

// type Mode = "public" | "patient" | "admin";

// export default function AIChatBox({ mode }: { mode: Mode }) {
//   const { messages, sendMessage, loading } = useAIChat(mode);
//   const [input, setInput] = useState("");

//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   /* =========================
//      AUTO SCROLL
//   ========================= */
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   /* =========================
//      SEND HANDLER
//   ========================= */
//   const handleSend = () => {
//     const trimmed = input.trim();
//     if (!trimmed || loading) return;

//     sendMessage(trimmed);
//     setInput("");
//   };

//   /* =========================
//      ENTER TO SEND
//   ========================= */
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white border rounded-xl shadow-sm">
//       {/* HEADER */}
//       <div className="px-4 py-3 border-b flex items-center justify-between">
//         <h2 className="font-semibold text-lg capitalize">
//           {mode} AI Assistant
//         </h2>

//         <span className="text-xs text-gray-500">
//           {loading ? "Thinking..." : "Online"}
//         </span>
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50">
//         {messages.length === 0 && (
//           <div className="text-center text-gray-400 mt-10 text-sm">
//             Start a conversation with AI...
//           </div>
//         )}

//         {messages.map((msg, i) => {
//           const isUser = msg.role === "user";

//           return (
//             <div
//               key={i}
//               className={`flex ${isUser ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
//                 ${
//                   isUser
//                     ? "bg-black text-white rounded-br-none"
//                     : "bg-white text-gray-800 border rounded-bl-none"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           );
//         })}

//         {/* TYPING INDICATOR */}
//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-white border px-4 py-2 rounded-2xl text-sm text-gray-500 animate-pulse">
//               AI is typing...
//             </div>
//           </div>
//         )}

//         <div ref={bottomRef} />
//       </div>

//       {/* INPUT */}
//       <div className="p-3 border-t bg-white flex items-center gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//           placeholder="Ask something..."
//           className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
//         />

//         <button
//           onClick={handleSend}
//           disabled={loading || !input.trim()}
//           className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { useAIChat } from "../../hooks/useAIChat";
import { Send, Mic } from "lucide-react";

type Mode = "public" | "patient" | "admin";

/* =========================
   SPEECH TYPES (SAFE)
========================= */
type SpeechRecognitionType = {
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEvent = {
  results: {
    0: {
      0: {
        transcript: string;
      };
    };
  };
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionType;
    webkitSpeechRecognition?: new () => SpeechRecognitionType;
  }
}

export default function AIChatBox({ mode }: { mode: Mode }) {
  const { messages, sendMessage, loading } = useAIChat(mode);

  const [input, setInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const handleSend = (): void => {
    const value = input.trim();
    if (!value || loading) return;

    sendMessage(value);
    setInput("");
  };

  /* =========================
     KEYBOARD HANDLER
  ========================= */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* =========================
     VOICE INPUT (SAFE OPTIONAL)
  ========================= */
  const startVoiceInput = (): void => {
    const SpeechAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechAPI) return;

    const recognition = new SpeechAPI();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => `${prev} ${transcript}`.trim());
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white border rounded-xl shadow-sm">
      {/* ================= HEADER ================= */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg capitalize">
          {mode} AI Assistant
        </h2>

        <span className="text-xs text-gray-500">
          {loading ? "Thinking..." : isListening ? "Listening..." : "Online"}
        </span>
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10 text-sm">
            Start a conversation with AI...
          </div>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                ${
                  isUser
                    ? "bg-black text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-2 rounded-2xl text-sm text-gray-500 animate-pulse">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ================= INPUT ================= */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        {/* TEXT INPUT */}
        <textarea
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={1}
          placeholder="Ask something..."
          className="flex-1 px-4 py-2 border rounded-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
        />

        {/* VOICE BUTTON */}
        <button
          type="button"
          onClick={startVoiceInput}
          disabled={loading}
          aria-label={isListening ? "Stop voice input" : "Start voice input"}
          className={`relative p-2 rounded-full border transition flex items-center justify-center
    ${
      isListening
        ? "bg-red-100 border-red-400 text-red-600"
        : "hover:bg-gray-100 text-gray-700"
    }`}
        >
          {/* MIC ICON */}
          <Mic className="w-4 h-4" />

          {/* 🔴 PULSING DOT WHEN LISTENING */}
          {isListening && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          )}
        </button>
        {/* SEND BUTTON */}
        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
