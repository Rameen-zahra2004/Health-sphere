// import { Router } from "express";

// /* ================= AUTH ================= */
// import authRoutes from "./auth.route";

// /* ================= USERS ================= */
// import patientRoutes from "./patientRoutes";
// import doctorRoutes from "./doctorRoutes";

// /* ================= ADMIN ================= */
// import adminRoutes from "./admin.routes";

// /* ================= HOSPITAL MODULES ================= */
// import statsRoutes from "./stats.route";
// import medicalRecordRoutes from "./medicalRecordRoutes";
// import appointmentRoutes from "./appointmentRoutes";

// const router = Router();

// /* ================= CORE MODULE ROUTES ================= */
// router.use("/auth", authRoutes);
// router.use("/patients", patientRoutes);
// router.use("/doctors", doctorRoutes);

// /* ================= ADMIN ROUTES ================= */
// router.use("/admin", adminRoutes);

// /* ================= APPOINTMENTS ================= */
// router.use("/appointments", appointmentRoutes);

// /* ================= MEDICAL SYSTEM ================= */
// router.use("/medical-records", medicalRecordRoutes);

// /* ================= ANALYTICS ================= */
// router.use("/stats", statsRoutes);

// /* ================= HEALTH CHECK ================= */
// router.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Health Sphere API is running 🚀",
//     timestamp: new Date().toISOString(),
//   });
// });

// export default router;
import { Router } from "express";

/* ================= AUTH ================= */
import authRoutes from "./auth.route";

/* ================= USERS ================= */
import patientRoutes from "./patientRoutes";
import doctorRoutes from "./doctorRoutes";

/* ================= ADMIN ================= */
import adminRoutes from "./admin.routes";

/* ================= HOSPITAL MODULES ================= */
import statsRoutes from "./stats.route";
import medicalRecordRoutes from "./medicalRecordRoutes";
import appointmentRoutes from "./appointmentRoutes";

const router = Router();

/* ================= DEBUG LOG ================= */
console.log("📦 routes/index.ts loaded");

/* ================= CORE MODULE ROUTES ================= */
router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/doctors", doctorRoutes);

/* ================= ADMIN ROUTES ================= */
router.use("/admin", adminRoutes);

/* ================= APPOINTMENTS ================= */
router.use("/appointments", appointmentRoutes);

/* ================= MEDICAL SYSTEM ================= */
router.use("/medical-records", medicalRecordRoutes);

/* ================= ANALYTICS ================= */
router.use("/stats", statsRoutes);

/* ================= HEALTH CHECK ================= */
router.get("/health", (req, res) => {
  console.log("❤️ /health hit");

  res.status(200).json({
    success: true,
    message: "Health Sphere API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

export default router;