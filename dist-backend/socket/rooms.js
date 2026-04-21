"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOMS = exports.getRoom = void 0;
const getRoom = (role, userId) => {
    return `${role}-${userId}`;
};
exports.getRoom = getRoom;
/* =========================
   PREDEFINED ROOMS (OPTIONAL)
========================= */
exports.ROOMS = {
    doctor: (id) => `doctor-${id}`,
    patient: (id) => `patient-${id}`,
    admin: (id) => `admin-${id}`,
};
