import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../store/auth/authThunk";
import type { User } from "@/app/types/user";

/* ================= TYPES ================= */

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

/* ================= INITIAL STATE ================= */

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  initialized: false,
};

/* ================= STORAGE UTILS (CLEAN) ================= */

const isClient = typeof window !== "undefined";

const storage = {
  setToken(token: string | null) {
    if (!isClient) return;
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  },

  setRole(role: string | null) {
    if (!isClient) return;
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  },
};

/* ================= SAFE ERROR PARSER ================= */

const getErrorMessage = (error: unknown): string => {
  const err = error as {
    message?: string;
    response?: { data?: { message?: string } };
  };

  return err.response?.data?.message || err.message || "Something went wrong";
};

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    /* ===== SET CREDENTIALS ===== */
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.initialized = true;
      state.error = null;

      storage.setToken(action.payload.token);
      storage.setRole(action.payload.user.role);
    },

    /* ===== LOGOUT ===== */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.initialized = true;

      storage.setToken(null);
      storage.setRole(null);
    },

    /* ===== CLEAR ERROR ===== */
    clearAuthError: (state) => {
      state.error = null;
    },

    /* ===== HYDRATE AUTH (APP RELOAD FIX) ===== */
    hydrateAuth: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.initialized = true;

      storage.setToken(action.payload.token);
      storage.setRole(action.payload.user.role);
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= LOGIN ================= */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.initialized = true;

        storage.setToken(action.payload.token);
        storage.setRole(action.payload.user.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })

      /* ================= REGISTER ================= */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.initialized = true;

        storage.setToken(action.payload.token);
        storage.setRole(action.payload.user.role);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      });
  },
});

/* ================= EXPORTS ================= */

export const {
  setCredentials,
  logout,
  clearAuthError,
  hydrateAuth,
} = authSlice.actions;

export default authSlice.reducer;