# Backend Production Setup & Memory Fix Progress

## 1. MongoDB Setup (Windows)
- [ ] Install MongoDB Community Server
- [ ] Add MongoDB to PATH
- [ ] Start MongoDB as Windows service
- [ ] Verify MongoDB running on port 27017

## 2. Backend Code Hardening
- [ ] backend/config/db.ts - Add connection logging + retry logic
- [ ] backend/models/doctor.ts - Add required fields (name, specialization, experience, fees)
- [ ] backend/controllers/doctorController.ts - Implement POST/GET with validation
- [ ] backend/routes/doctorRoutes.ts - Protected routes with auth middleware
- [ ] backend/middleware/authMiddleware.ts - Strict JWT verification + 401 handling
- [ ] backend/middleware/errorMiddleware.ts - Global error format
- [ ] backend/server.ts - Production middleware order + error handling

## 3. API Validation
- [ ] /api/health (200)
- [ ] /api/auth/login (invalid credentials - 401/400)
- [ ] /api/patients (no token - 401)
- [ ] /api/doctors (no token - 401)
- [ ] POST /api/do
