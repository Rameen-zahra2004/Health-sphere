"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSocket = exports.removeUser = exports.addUser = void 0;
const userSocketMap = new Map();
// userId -> socketId
/* =========================
   ADD USER
========================= */
const addUser = (userId, socketId) => {
    userSocketMap.set(userId, socketId);
};
exports.addUser = addUser;
/* =========================
   REMOVE USER
========================= */
const removeUser = (socketId) => {
    for (const [userId, id] of userSocketMap.entries()) {
        if (id === socketId) {
            userSocketMap.delete(userId);
            break;
        }
    }
};
exports.removeUser = removeUser;
/* =========================
   GET SOCKET BY USER
========================= */
const getUserSocket = (userId) => {
    return userSocketMap.get(userId);
};
exports.getUserSocket = getUserSocket;
