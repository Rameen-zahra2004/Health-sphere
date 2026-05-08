// import "express-serve-static-core";
// import { Types } from "mongoose";

// declare module "express-serve-static-core" {
//   interface Request {
//     // ✅ YOUR EXISTING FIELDS
//     validatedBody?: unknown;
//     validatedParams?: unknown;
//     validatedQuery?: unknown;

//     // ✅ ADD THIS (FIX)
//     user?: {
//       id: string;
//       role: string;
//       _id?: Types.ObjectId;
//     };
//   }
// }
import "express-serve-static-core";
import { Types } from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    /* =========================
       VALIDATION FIELDS
    ========================= */
    validatedBody?: unknown;
    validatedParams?: unknown;
    validatedQuery?: unknown;

    /* =========================
       AUTH USER
    ========================= */
    user?: {
      id: string;
      role: string;
      _id?: Types.ObjectId;
    };

    /* =========================
       ✅ ADD THIS (FIX)
    ========================= */
    sessionId?: string;
  }
}