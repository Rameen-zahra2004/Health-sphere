// import { useCallback, useEffect, useRef, useState } from "react";
// import { streamAIResponse } from "../lib/stream";

// type AIRole = "system" | "user" | "assistant";

// export interface AIMessage {
//   role: AIRole;
//   content: string;
// }

// export const useAIChat = (mode: "public" | "patient" | "admin") => {
//   const [messages, setMessages] = useState<AIMessage[]>([]);
//   const [loading, setLoading] = useState(false);

//   const messagesRef = useRef<AIMessage[]>([]);
//   const stopStreamRef = useRef<(() => void) | null>(null);

//   useEffect(() => {
//     messagesRef.current = messages;
//   }, [messages]);

//   /* ================= SEND ================= */
//   const sendMessage = useCallback(
//     async (message: string) => {
//       if (!message.trim() || loading) return;

//       setLoading(true);

//       const userMsg: AIMessage = {
//         role: "user",
//         content: message,
//       };

//       const updatedMessages = [...messagesRef.current, userMsg];
//       setMessages(updatedMessages);

//       let assistantText = "";

//       const stopStream = streamAIResponse(
//         mode,
//         { messages: updatedMessages }, // ✅ correct payload
//         {
//           onMessage: (chunk: string) => {
//             assistantText += chunk;

//             setMessages((prev) => {
//               const copy = [...prev];
//               const last = copy[copy.length - 1];

//               if (last?.role === "assistant") {
//                 last.content = assistantText;
//               } else {
//                 copy.push({
//                   role: "assistant",
//                   content: assistantText,
//                 });
//               }

//               return copy;
//             });
//           },

//           onDone: () => {
//             setLoading(false);
//           },

//           onError: (err: Error) => {
//             console.error("AI Stream Error:", err);

//             setMessages((prev) => [
//               ...prev,
//               {
//                 role: "assistant",
//                 content: "⚠️ Something went wrong. Try again.",
//               },
//             ]);

//             setLoading(false);
//           },
//         }
//       );

//       stopStreamRef.current = stopStream;
//     },
//     [mode, loading]
//   );

//   /* ================= STOP ================= */
//   const stop = useCallback(() => {
//     stopStreamRef.current?.();
//     setLoading(false);
//   }, []);

//   /* ================= CLEANUP ================= */
//   useEffect(() => {
//     return () => {
//       stopStreamRef.current?.();
//     };
//   }, []);

//   return {
//     messages,
//     sendMessage,
//     loading,
//     stop,
//   };
// };
import { useCallback, useEffect, useRef, useState } from "react";
import { streamAIResponse } from "../lib/stream";

/* =========================
   TYPES
========================= */

type AIRole = "system" | "user" | "assistant";

export interface AIMessage {
  role: AIRole;
  content: string;
}

/* =========================
   HOOK
========================= */

export const useAIChat = (
  mode: "public" | "patient" | "admin"
) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesRef = useRef<AIMessage[]>([]);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = useCallback(
    (message: string) => {
      if (!message.trim() || loading) return;

      setLoading(true);

      const userMsg: AIMessage = {
        role: "user",
        content: message,
      };

      const updatedMessages = [...messagesRef.current, userMsg];

      setMessages(updatedMessages);

      let assistantText = "";

      const stop = streamAIResponse(
        {
          message,
          history: updatedMessages,
          mode, // ✅ IMPORTANT: inside payload
        },
        {
          onMessage: (chunk: string) => {
            assistantText += chunk;

            setMessages((prev) => {
              const copy = [...prev];
              const last = copy[copy.length - 1];

              if (last?.role === "assistant") {
                last.content = assistantText;
              } else {
                copy.push({
                  role: "assistant",
                  content: assistantText,
                });
              }

              return copy;
            });
          },

          onDone: () => {
            setLoading(false);
          },

          onError: (err: Error) => {
            console.error("AI Error:", err);

            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "⚠️ AI request failed. Try again.",
              },
            ]);

            setLoading(false);
          },
        }
      );

      stopRef.current = stop;
    },
    [mode, loading]
  );

  /* =========================
     STOP STREAM
  ========================= */
  const stop = useCallback(() => {
    stopRef.current?.();
    setLoading(false);
  }, []);

  /* =========================
     CLEANUP
  ========================= */
  useEffect(() => {
    return () => {
      stopRef.current?.();
    };
  }, []);

  return {
    messages,
    sendMessage,
    loading,
    stop,
  };
};