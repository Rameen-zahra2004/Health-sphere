// import http from "http";
// import dotenv from "dotenv";
// import path from "path";
// import { Server } from "socket.io";

// import app from "./app";
// import connectDB from "./config/db";
// import { config } from "./config";

// dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// const server = http.createServer(app);

// /* ================= SOCKET ================= */
// export const io = new Server(server, {
//   cors: {
//     origin: config.clientUrl || "http://localhost:3000",
//     credentials: true,
//   },
//   transports: ["websocket", "polling"],
// });

// io.on("connection", (socket) => {
//   console.log("🟢 connected:", socket.id);

//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 disconnected:", socket.id);
//   });
// });

// /* ================= START ================= */
// const PORT = process.env.PORT || 4000;

// connectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log("🚀 SERVER STARTED:", PORT);
//   });
// });
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import app from "./app";
import connectDB from "./config/db";
import { config } from "./config";

/* ===============================
   ENV (FIXED - NO CONFLICT)
   =============================== */
dotenv.config(); // ✅ IMPORTANT: only this, no path, no duplication

/* ===============================
   SAFETY CHECK (DEBUG)
   =============================== */
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env");
}

/* ===============================
   HTTP SERVER
   =============================== */
const server = http.createServer(app);

/* ===============================
   SOCKET.IO
   =============================== */
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

/* ===============================
   START SERVER
   =============================== */
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("🚀 SERVER STARTED:", PORT);
      console.log("🔐 JWT SECRET LOADED:", !!process.env.JWT_SECRET);
    });
  })
  .catch((err) => {
    console.error("❌ DB CONNECTION FAILED:", err);
    process.exit(1);
  });