import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { adminApi } from "@/app/lib/api/adminApi";
import type { AsyncState } from "../types/common";
import type { Appointment } from "@/app/types/appointment";

/* ================= TYPES ================= */

export interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  experience: number;
  bio?: string;
  clinicAddress?: string;
  consultationFee?: number;
}

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

/* ================= DTO ================= */

export type CreateDoctorDTO = Omit<Doctor, "_id"> & {
  password: string;
};

/* ================= STATE ================= */

interface AdminState extends AsyncState {
  admins: Admin[];
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];

  selectedDoctor: Doctor | null;
  selectedPatient: Patient | null;
  selectedAppointment: Appointment | null;

  actionLoading: boolean;
}

const initialState: AdminState = {
  admins: [],
  doctors: [],
  patients: [],
  appointments: [],

  selectedDoctor: null,
  selectedPatient: null,
  selectedAppointment: null,

  loading: false,
  actionLoading: false,
  error: null,
  status: "idle",
};

/* ================= ERROR ================= */

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const err = error as any;
    return err.response?.data?.message || err.message || "Error";
  }
  return "Something went wrong";
};

/* =====================================================
   DOCTORS
===================================================== */

export const fetchDoctors = createAsyncThunk<Doctor[]>(
  "admin/fetchDoctors",
  async (_, thunkAPI) => {
    try {
      return await adminApi.getAllDoctors();
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

export const fetchDoctorById = createAsyncThunk<Doctor, string>(
  "admin/fetchDoctorById",
  async (id, thunkAPI) => {
    try {
      return await adminApi.getDoctorById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createDoctor = createAsyncThunk<Doctor, CreateDoctorDTO>(
  "admin/createDoctor",
  async (data, thunkAPI) => {
    try {
      return await adminApi.createDoctor(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateDoctorById = createAsyncThunk<
  Doctor,
  { id: string; data: Partial<CreateDoctorDTO> }
>("admin/updateDoctorById", async ({ id, data }, thunkAPI) => {
  try {
    return await adminApi.updateDoctor(id, data);
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMessage(err));
  }
});

export const deleteDoctor = createAsyncThunk<string, string>(
  "admin/deleteDoctor",
  async (id, thunkAPI) => {
    try {
      await adminApi.deleteDoctor(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

/* =====================================================
   PATIENTS
===================================================== */

export const fetchPatients = createAsyncThunk<Patient[]>(
  "admin/fetchPatients",
  async (_, thunkAPI) => {
    try {
      return await adminApi.getAllPatients();
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

/* =====================================================
   APPOINTMENTS
===================================================== */

export const fetchAppointments = createAsyncThunk<Appointment[]>(
  "admin/fetchAppointments",
  async (_, thunkAPI) => {
    try {
      return await adminApi.getAllAppointments();
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

/* =====================================================
   SLICE
===================================================== */

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    clearAdminState(state) {
      state.loading = false;
      state.actionLoading = false;
      state.error = null;
    },

    /* ================= IMPORTANT ================= */
    setCurrentDoctor(state, action: PayloadAction<Doctor | null>) {
      state.selectedDoctor = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== DOCTORS ===== */
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })

      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.selectedDoctor = action.payload;
      })

      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.unshift(action.payload);
      })

      .addCase(updateDoctorById.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.doctors.findIndex(
          (d) => d._id === updated._id
        );

        if (index !== -1) {
          state.doctors[index] = updated;
        }

        state.selectedDoctor = updated;
      })

      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(
          (d) => d._id !== action.payload
        );
      })

      /* ===== PATIENTS ===== */
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
      })

      /* ===== APPOINTMENTS ===== */
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      });
  },
});

export const {
  clearAdminState,
  setCurrentDoctor,
} = adminSlice.actions;

export default adminSlice.reducer;