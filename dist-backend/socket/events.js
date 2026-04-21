"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentEvents = exports.emitToUser = void 0;
const index_1 = require("./index");
const rooms_1 = require("./rooms");
/* =========================
   GENERIC EMITTER
========================= */
const emitToUser = (role, userId, event, payload) => {
    const io = (0, index_1.getIO)();
    const room = (0, rooms_1.getRoom)(role, userId);
    io.to(room).emit(event, payload);
};
exports.emitToUser = emitToUser;
/* =========================
   APPOINTMENT EVENTS
========================= */
exports.appointmentEvents = {
    created: (doctorId, patientId, data) => {
        const io = (0, index_1.getIO)();
        io.to((0, rooms_1.getRoom)("doctor", doctorId)).emit("appointment:created", data);
        io.to((0, rooms_1.getRoom)("patient", patientId)).emit("appointment:created", data);
    },
    updated: (doctorId, patientId, data) => {
        const io = (0, index_1.getIO)();
        io.to((0, rooms_1.getRoom)("doctor", doctorId)).emit("appointment:updated", data);
        io.to((0, rooms_1.getRoom)("patient", patientId)).emit("appointment:updated", data);
    },
    cancelled: (doctorId, patientId, data) => {
        const io = (0, index_1.getIO)();
        io.to((0, rooms_1.getRoom)("doctor", doctorId)).emit("appointment:cancelled", data);
        io.to((0, rooms_1.getRoom)("patient", patientId)).emit("appointment:cancelled", data);
    },
    completed: (doctorId, patientId, data) => {
        const io = (0, index_1.getIO)();
        io.to((0, rooms_1.getRoom)("doctor", doctorId)).emit("appointment:completed", data);
        io.to((0, rooms_1.getRoom)("patient", patientId)).emit("appointment:completed", data);
    },
};
