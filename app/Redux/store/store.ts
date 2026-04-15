import { configureStore } from "@reduxjs/toolkit";

/* ===== SLICES ===== */
import authReducer from "../slices/authSlice";
import patientReducer from "../slices/patientSlice";
import appointmentReducer from "../slices/appointmentSlice";
import doctorReducer from "../slices/doctorSlice";
import doctorDashboardReducer from "../slices/doctorSlice";

import medicalRecordReducer from "../slices/medicalRecordSlice";
import adminReducer from "../slices/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    appointments: appointmentReducer,
    doctor: doctorReducer,
    doctorDashboard: doctorDashboardReducer,
    medicalRecords: medicalRecordReducer,
     admin: adminReducer,
  },

  /* ================= MIDDLEWARE ================= */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  /* Redux DevTools auto-enabled in development */
  devTools: process.env.NODE_ENV !== "production",
});

/* ================= TYPES ================= */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;