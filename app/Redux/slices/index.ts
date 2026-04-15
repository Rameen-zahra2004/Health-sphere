// // src/Redux/slices/index.ts


export { default as authReducer } from "./authSlice";
export { default as patientReducer } from "./patientSlice";
export { default as appointmentReducer } from "./appointmentSlice";
export { default as doctorReducer } from "./doctorSlice";

/* ================= NEW SLICES ADDED ================= */
export { default as doctorDashboardReducer } from "./doctorAvailability.slice";
export { default as medicalRecordReducer } from "./medicalRecordSlice";
