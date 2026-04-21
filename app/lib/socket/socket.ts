import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/* ================= INIT ================= */
export const initSocket = (): Socket => {
  if (socket) return socket;

  const URL =
    process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

  socket = io(URL, {
    transports: ["websocket", "polling"],
    withCredentials: true,
    reconnection: true,
  });

  socket.on("connect", () => {
    console.log("🟢 Connected:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
  });

  return socket;
};

/* ================= SAFE GET ================= */
export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket first.");
  }
  return socket;
};

/* ================= DISCONNECT ================= */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};