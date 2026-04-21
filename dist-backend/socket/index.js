"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
/**
 * Initialize Socket.IO (CALL ONCE ONLY in server.ts)
 */
const initSocket = (httpServer) => {
    if (io) {
        console.warn("⚠️ Socket already initialized");
        return io;
    }
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            credentials: true,
        },
        // production-safe settings
        transports: ["websocket", "polling"],
        pingTimeout: 60000,
        pingInterval: 25000,
    });
    console.log("⚡ Socket.IO initialized");
    io.on("connection", (socket) => {
        console.log("🟢 User connected:", socket.id);
        // join room (doctor/patient/admin/chat rooms)
        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`📦 Socket ${socket.id} joined room: ${roomId}`);
        });
        // leave room
        socket.on("leave-room", (roomId) => {
            socket.leave(roomId);
            console.log(`📤 Socket ${socket.id} left room: ${roomId}`);
        });
        // optional: real-time messaging
        socket.on("message", (data) => {
            io?.to(data.roomId).emit("message", data);
        });
        socket.on("disconnect", (reason) => {
            console.log("🔴 User disconnected:", socket.id, "|", reason);
        });
    });
    return io;
};
exports.initSocket = initSocket;
/**
 * Get Socket instance anywhere in backend
 */
const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized. Call initSocket first.");
    }
    return io;
};
exports.getIO = getIO;
