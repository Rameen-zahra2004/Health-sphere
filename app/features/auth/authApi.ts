
import api from "../../lib/api/api";

/* ================= TYPES ================= */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "patient" | "doctor" | "admin";
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  isVerified?: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

/* Backend wrapper */
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ================= LOGIN ================= */

export const loginApi = async (
  data: LoginPayload
): Promise<AuthResponse> => {
  const res = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data
  );

  return res.data.data;
};

/* ================= REGISTER ================= */

export const registerApi = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const res = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    data
  );

  return res.data.data;
};

/* ================= GET ME ================= */

export const getMeApi = async (): Promise<AuthUser> => {
  const res = await api.get<ApiResponse<AuthUser>>("/auth/me");
  return res.data.data;
};

/* ================= LOGOUT ================= */

export const logoutApi = async (): Promise<string> => {
  const res = await api.post<ApiResponse<string>>("/auth/logout");
  return res.data.message;
};