import http from "http";
import dotenv from "dotenv";
import path from "path";
import { Server } from "socket.io";

import app from "./app";
import connectDB from "./config/db";
import { config } from "./config";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const server = http.createServer(app);

/* ================= SOCKET ================= */
export const io = new Server(server, {
  cors: {
    origin: config.clientUrl || "http://localhost:3000",
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  console.log("🟢 connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("🔴 disconnected:", socket.id);
  });
});

/* ================= START ================= */
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("🚀 SERVER STARTED:", PORT);
  });
});