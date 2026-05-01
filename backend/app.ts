
// import express, { Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";
// import rateLimit from "express-rate-limit";
// import availabilityRoutes from "./routes/availability.routes";
// import patientRoutes from "./routes/patientRoutes";
// import statsRoutes from "./routes/stats.route";
// import medicalRecordRoutes from "./routes/medicalRecordRoutes";
// import appointmentRoutes from "./routes/appointmentRoutes";
// import adminRoutes from "./routes/admin.routes";
// import doctorRoutes from "./routes/doctorRoutes";
// import authRoutes from "./routes/auth.route";
// dotenv.config();

// const app = express();
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:5173",
//   "http://localhost:4200",
//   process.env.CLIENT_URL,
// ].filter(Boolean) as string[];
// /* =========================
//    TRUST PROXY
// ========================= */
// app.set("trust proxy", 1);

// /* =========================
//    SECURITY
// ========================= */
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:3000",
// //       "https://health-sphere-ann395tkm-rameen-zahra2004s-projects.vercel.app"
// //     ],
// //     credentials: true,
// //   })
// // );
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow Postman, mobile apps, curl
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       console.warn(`⚠️ CORS blocked: ${origin}`);
//       return callback(new Error("Not allowed by CORS"));
//     },

//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   })
// );
// app.use(helmet());

// /* =========================
//    RATE LIMIT
// ========================= */
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 1000,
//     standardHeaders: true,
//     legacyHeaders: false,
//   })
// );

// /* =========================
//    BODY PARSER
// ========================= */
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// /* =========================
//    LOGGING
// ========================= */
// if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
// }

// /* =========================
//    HEALTH CHECK
// ========================= */
// app.get("/health", (_req: Request, res: Response) => {
//   res.status(200).json({
//     success: true,
//     message: "Health Sphere API running",
//   });
// });

// /* =========================
//    🚨 FIXED ROUTES ORDER
// ========================= */
// app.use("/api/patients", patientRoutes);
// app.use("/api/medical-records", medicalRecordRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/stats", statsRoutes);
// app.use("/api/availability", availabilityRoutes);
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/auth", authRoutes);
// /* =========================
//    404 HANDLER
// ========================= */
// app.use((_req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// export default app;
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

/* =========================
   ROUTES IMPORTS
========================= */
import availabilityRoutes from "./routes/availability.routes";
import patientRoutes from "./routes/patientRoutes";
import statsRoutes from "./routes/stats.route";
import medicalRecordRoutes from "./routes/medicalRecordRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import adminRoutes from "./routes/admin.routes";
import doctorRoutes from "./routes/doctorRoutes";
import authRoutes from "./routes/auth.route";

/* 🤖 AI ROUTES (NEW) */
import aiRoutes from "./routes/ai.routes";
import aiStreamRoutes from "./routes/ai.stream.route";

dotenv.config();

const app = express();

/* =========================
   ALLOWED ORIGINS
========================= */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4200",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

/* =========================
   TRUST PROXY
========================= */
app.set("trust proxy", 1);

/* =========================
   SECURITY (CORS + HELMET)
========================= */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`⚠️ CORS blocked: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(helmet());

/* =========================
   RATE LIMIT
========================= */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* =========================
   BODY PARSER
========================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================
   LOGGING
========================= */
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Health Sphere API running",
  });
});

/* =========================
   🚀 API ROUTES
========================= */
app.use("/api/patients", patientRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/auth", authRoutes);

/* =========================
   🤖 AI MODULE ROUTES (ADDED)
========================= */
app.use("/api/ai", aiRoutes);
app.use("/api/ai", aiStreamRoutes);

/* =========================
   404 HANDLER
========================= */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;