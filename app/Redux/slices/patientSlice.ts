import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Patient, UpdatePatientPayload } from "@/app/lib/api/patient";
import {
  getMyPatientProfile,
  updatePatientProfile,
  getAllPatients,
} from "@/app/lib/api/patient";

interface PatientState {
  profile: Patient | null;
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  profile: null,
  patients: [],
  loading: false,
  error: null,
};

/* ================= THUNKS ================= */

export const fetchPatientProfile = createAsyncThunk(
  "patient/profile",
  async () => {
    return await getMyPatientProfile();
  }
);

export const updatePatient = createAsyncThunk(
  "patient/update",
  async (payload: UpdatePatientPayload) => {
    return await updatePatientProfile(payload);
  }
);

export const fetchPatients = createAsyncThunk(
  "patient/all",
  async () => {
    return await getAllPatients();
  }
);

/* ================= SLICE ================= */

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = Array.isArray(action.payload)
          ? action.payload
          : [];
      });
  },
});

export const { clearError } = patientSlice.actions;
export default patientSlice.reducer;