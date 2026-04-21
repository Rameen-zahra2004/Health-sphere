"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const config_1 = require("./config");
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
const server = http_1.default.createServer(app_1.default);
/* ================= SOCKET ================= */
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.config.clientUrl || "http://localhost:3000",
        credentials: true,
    },
    transports: ["websocket", "polling"],
});
exports.io.on("connection", (socket) => {
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
(0, db_1.default)().then(() => {
    server.listen(PORT, () => {
        console.log("🚀 SERVER STARTED:", PORT);
    });
});
