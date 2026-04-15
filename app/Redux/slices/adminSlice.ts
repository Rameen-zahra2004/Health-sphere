
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { adminApi } from "@/app/lib/api/adminApi";
import type { AsyncState } from "../types/common";

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

export interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  date?: string;
}

/* ================= REQUEST TYPES ================= */

export type CreateAdminDTO = Omit<Admin, "_id" | "role"> & {
  password: string;
};

export type CreateDoctorDTO = Omit<Doctor, "_id"> & {
  password: string;
};

export type UpdateAppointmentStatusDTO = {
  id: string;
  status: Appointment["status"];
};

/* ================= STATE ================= */

interface AdminState extends AsyncState {
  admins: Admin[];
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];

  currentAdmin: Admin | null;
  currentDoctor: Doctor | null;
  currentPatient: Patient | null;
  currentAppointment: Appointment | null;

  actionLoading: boolean;
}
const initialState: AdminState = {
  admins: [],
  doctors: [],
  patients: [],
  appointments: [],

  currentAdmin: null,
  currentDoctor: null,
  currentPatient: null,
  currentAppointment: null,

  loading: false,
  actionLoading: false,
  error: null,

  status: "idle", // ✅ FIXED
};

/* ================= ERROR HANDLER ================= */

const getErrorMessage = (error: unknown): string => {
  const err = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return err.response?.data?.message || err.message || "Something went wrong";
};

/* ================= SAFE RESPONSE ================= */

type ApiResponse<T> = {
  data: T;
};

function getData<T>(response: unknown): T {
  const res = response as ApiResponse<T>;

  if (!res || typeof res !== "object") {
    throw new Error("Invalid API response");
  }

  return res.data;
}

/* =====================================================
   🟦 ADMIN THUNKS
===================================================== */

export const fetchAdmins = createAsyncThunk<
  Admin[],
  void,
  { rejectValue: string }
>("admin/fetchAdmins", async (_, thunkAPI) => {
  try {
    return getData<Admin[]>(await adminApi.getAllAdmins());
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createAdmin = createAsyncThunk<
  Admin,
  CreateAdminDTO,
  { rejectValue: string }
>("admin/createAdmin", async (data, thunkAPI) => {
  try {
    return getData<Admin>(await adminApi.createAdmin(data));
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteAdmin = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/deleteAdmin", async (id, thunkAPI) => {
  try {
    await adminApi.deleteAdmin(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* =====================================================
   🟩 DOCTOR THUNKS
===================================================== */

export const fetchDoctors = createAsyncThunk<
  Doctor[],
  void,
  { rejectValue: string }
>("admin/fetchDoctors", async (_, thunkAPI) => {
  try {
    return getData<Doctor[]>(await adminApi.getAllDoctors());
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createDoctor = createAsyncThunk<
  Doctor,
  CreateDoctorDTO,
  { rejectValue: string }
>("admin/createDoctor", async (data, thunkAPI) => {
  try {
    const payload = {
      ...data,
      bio: data.bio ?? "", // ✅ FIX HERE
      clinicAddress: data.clinicAddress ?? "",
      consultationFee: data.consultationFee ?? 0,
    };

    return getData<Doctor>(
      await adminApi.createDoctor(payload)
    );
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteDoctor = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/deleteDoctor", async (id, thunkAPI) => {
  try {
    await adminApi.deleteDoctor(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* =====================================================
   🟨 PATIENT THUNKS
===================================================== */

export const fetchPatients = createAsyncThunk<
  Patient[],
  void,
  { rejectValue: string }
>("admin/fetchPatients", async (_, thunkAPI) => {
  try {
    return getData<Patient[]>(await adminApi.getAllPatients());
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* =====================================================
   🟧 APPOINTMENT THUNKS
===================================================== */

export const fetchAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("admin/fetchAppointments", async (_, thunkAPI) => {
  try {
    return getData<Appointment[]>(await adminApi.getAllAppointments());
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateAppointmentStatus = createAsyncThunk<
  Appointment,
  UpdateAppointmentStatusDTO,
  { rejectValue: string }
>("admin/updateAppointmentStatus", async (data, thunkAPI) => {
  try {
    const res = await adminApi.updateAppointmentStatus(data.id, {
      status: data.status,
    });

    return getData<Appointment>(res);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* ================= SLICE ================= */

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    clearAdminState(state) {
      state.loading = false;
      state.actionLoading = false;
      state.error = null;
    },

    setCurrentAdmin(state, action: PayloadAction<Admin | null>) {
      state.currentAdmin = action.payload;
    },

    setCurrentDoctor(state, action: PayloadAction<Doctor | null>) {
      state.currentDoctor = action.payload;
    },

    setCurrentPatient(state, action: PayloadAction<Patient | null>) {
      state.currentPatient = action.payload;
    },

    setCurrentAppointment(state, action: PayloadAction<Appointment | null>) {
      state.currentAppointment = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* DOCTORS */
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.unshift(action.payload);
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(d => d._id !== action.payload);
      })

      /* PATIENTS */
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
      })

      /* APPOINTMENTS */
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          a => a._id === action.payload._id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })

      /* ADMINS */
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.admins.unshift(action.payload);
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter(a => a._id !== action.payload);
      });
  },
});

export const {
  clearAdminState,
  setCurrentAdmin,
  setCurrentDoctor,
  setCurrentPatient,
  setCurrentAppointment,
} = adminSlice.actions;

export default adminSlice.reducer;