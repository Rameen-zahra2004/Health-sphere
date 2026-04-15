

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doctorDashboardApi } from "@/app/lib/api/doctorApi";
import type { AsyncState } from "../types/common";

/* =========================
   TYPES
========================= */

export interface DoctorProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  experience: number;

  bio?: string;
  clinicAddress?: string;
  consultationFee?: number;

  availability: "available" | "unavailable";
  hospital?: string;
  isVerified: boolean;

  profileImage?: string; // ✅ FIXED
}

export interface AppointmentPatient {
  _id: string;
  name: string;
  email: string;
}

export interface Appointment {
  _id: string;
  patientId: AppointmentPatient;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export interface DoctorDashboardStats {
  totalPatients: number;
  totalAppointments: number;
  totalReviews: number;
}

export interface DoctorDashboardResponse {
  doctor: {
    name: string;
    specialization: string;
    verified: boolean;
  };
  stats: DoctorDashboardStats;
  upcomingAppointments: Appointment[];
}

/* =========================
   STATE
========================= */

interface DoctorDashboardState {
  profile: DoctorProfile | null;
  dashboard: DoctorDashboardResponse | null;
  patients: AppointmentPatient[];
  appointments: Appointment[];

  profileState: AsyncState;
  dashboardState: AsyncState;
  listState: AsyncState;
}

/* =========================
   INITIAL STATE (FIXED)
========================= */

const initialState: DoctorDashboardState = {
  profile: null,
  dashboard: null,
  patients: [],
  appointments: [],

  profileState: {
    loading: false,
    error: null,
    status: "idle", // ✅ FIX
  },

  dashboardState: {
    loading: false,
    error: null,
    status: "idle", // ✅ FIX
  },

  listState: {
    loading: false,
    error: null,
    status: "idle", // ✅ FIX
  },
};

/* =========================
   ERROR HANDLER
========================= */

const getErrorMessage = (error: unknown): string => {
  const err = error as {
    message?: string;
    response?: { data?: { message?: string } };
  };

  return err.response?.data?.message || err.message || "Something went wrong";
};

/* =========================
   THUNKS (USING API CLASS)
========================= */

export const fetchDoctorProfile = createAsyncThunk<
  DoctorProfile,
  void,
  { rejectValue: string }
>("doctorDashboard/profile", async (_, { rejectWithValue }) => {
  try {
    return await doctorDashboardApi.getProfile(); // ✅ CLEAN
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateDoctorProfile = createAsyncThunk<
  DoctorProfile,
  Partial<DoctorProfile>,
  { rejectValue: string }
>("doctorDashboard/updateProfile", async (data, { rejectWithValue }) => {
  try {
    return await doctorDashboardApi.updateProfile(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchDoctorDashboard = createAsyncThunk<
  DoctorDashboardResponse,
  void,
  { rejectValue: string }
>("doctorDashboard/getDashboard", async (_, { rejectWithValue }) => {
  try {
    const data = await doctorDashboardApi.getDashboard();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error)) as any; // ✅ FIX
  }

});

export const fetchDoctorPatients = createAsyncThunk<
  AppointmentPatient[],
  void,
  { rejectValue: string }
>("doctorDashboard/getPatients", async (_, { rejectWithValue }) => {
  try {
    return (await doctorDashboardApi.getPatients()) as AppointmentPatient[];
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchDoctorAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("doctorDashboard/getAppointments", async (_, { rejectWithValue }) => {
  try {
    return (await doctorDashboardApi.getAppointments()) as Appointment[];
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/* =========================
   SLICE
========================= */

const doctorDashboardSlice = createSlice({
  name: "doctorDashboard",
  initialState,

  reducers: {
    clearDoctorErrors(state) {
      state.profileState.error = null;
      state.dashboardState.error = null;
      state.listState.error = null;
    },

    clearDashboard(state) {
      state.dashboard = null;
      state.profile = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* PROFILE */
      .addCase(fetchDoctorProfile.pending, (state) => {
        state.profileState.loading = true;
        state.profileState.status = "loading";
      })
      .addCase(
        fetchDoctorProfile.fulfilled,
        (state, action: PayloadAction<DoctorProfile>) => {
          state.profileState.loading = false;
          state.profileState.status = "succeeded";
          state.profile = action.payload;
        }
      )
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.profileState.loading = false;
        state.profileState.status = "failed";
        state.profileState.error =
          action.payload ?? "Failed to fetch profile";
      })

      /* DASHBOARD */
      .addCase(fetchDoctorDashboard.pending, (state) => {
        state.dashboardState.loading = true;
        state.dashboardState.status = "loading";
      })
      .addCase(
        fetchDoctorDashboard.fulfilled,
        (state, action: PayloadAction<DoctorDashboardResponse>) => {
          state.dashboardState.loading = false;
          state.dashboardState.status = "succeeded";
          state.dashboard = action.payload;
        }
      )
      .addCase(fetchDoctorDashboard.rejected, (state, action) => {
        state.dashboardState.loading = false;
        state.dashboardState.status = "failed";
        state.dashboardState.error =
          action.payload ?? "Failed to load dashboard";
      })

      /* PATIENTS */
      .addCase(fetchDoctorPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
      })

      /* APPOINTMENTS */
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      });
  },
});

/* =========================
   EXPORTS
========================= */

export const { clearDoctorErrors, clearDashboard } =
  doctorDashboardSlice.actions;

export default doctorDashboardSlice.reducer;