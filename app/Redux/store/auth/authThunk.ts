
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/app/services/authService";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "@/app/types/auth";

/* ===============================
   ERROR HANDLING (STRICT TYPED)
================================ */

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

const getErrorMessage = (err: unknown): string => {
  const error = err as ApiError;

  return (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
};

/* ===============================
   LOGIN THUNK (PRODUCTION READY)
================================ */

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await authService.login(data);

    // 🔐 Persist auth securely (frontend state layer)
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.user.role);
      localStorage.setItem("userId", response.user.id);
    }

    return response;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/* ===============================
   REGISTER THUNK (PRODUCTION READY)
================================ */

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    const payload: RegisterCredentials = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
      role: data.role ?? "patient",
    };

    const response = await authService.register(payload);

    // optional auto-login behavior (recommended for UX)
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.user.role);
      localStorage.setItem("userId", response.user.id);
    }

    return response;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err));
  }
});

/* ===============================
   LOGOUT THUNK (CLEAN + SAFE)
================================ */

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    }

    return true;
  }
);