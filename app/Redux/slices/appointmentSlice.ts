import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  Appointment,
  createAppointment,
  cancelAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} from "@/app/lib/api/appointmentApi";

/* ================= STATE ================= */

export interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  status: "idle",
  error: null,
};

/* ================= ERROR HANDLER ================= */

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;

  const e = err as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return e.response?.data?.message || e.message || "Something went wrong";
};

/* ================= THUNKS ================= */

/* CREATE */
export const createAppointmentThunk = createAsyncThunk<
  Appointment,
  Parameters<typeof createAppointment>[0],
  { rejectValue: string }
>(
  "appointment/create",
  async (data, { rejectWithValue }) => {
    try {
      return await createAppointment(data);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

/* PATIENT FETCH */
export const fetchPatientAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>(
  "appointment/fetchPatient",
  async (_, { rejectWithValue }) => {
    try {
      return await getPatientAppointments();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

/* DOCTOR FETCH */
export const fetchDoctorAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>(
  "appointment/fetchDoctor",
  async (_, { rejectWithValue }) => {
    try {
      return await getDoctorAppointments();
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

/* CANCEL */
export const cancelAppointmentThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "appointment/cancel",
  async (id, { rejectWithValue }) => {
    try {
      await cancelAppointment(id);
      return id;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

/* UPDATE STATUS */
export const updateAppointmentStatusThunk = createAsyncThunk<
  Appointment,
  { id: string; status: Appointment["status"] },
  { rejectValue: string }
>(
  "appointment/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateAppointmentStatus(id, status);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

/* ================= SLICE ================= */

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,

  reducers: {
    clearAppointmentState: (state) => {
      state.loading = false;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= LOADING STATES ================= */
      .addCase(fetchPatientAppointments.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createAppointmentThunk.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })

      /* ================= PATIENT FETCH ================= */
      .addCase(
        fetchPatientAppointments.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.loading = false;
          state.status = "succeeded";
          state.appointments = action.payload;
        }
      )

      /* ================= DOCTOR FETCH ================= */
      .addCase(
        fetchDoctorAppointments.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.loading = false;
          state.status = "succeeded";
          state.appointments = action.payload;
        }
      )

      /* ================= CREATE ================= */
      .addCase(createAppointmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.appointments.unshift(action.payload);
      })

      /* ================= CANCEL ================= */
      .addCase(cancelAppointmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.appointments = state.appointments.filter(
          (a) => a._id !== action.payload
        );
      })

      /* ================= UPDATE ================= */
      .addCase(updateAppointmentStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";

        const index = state.appointments.findIndex(
          (a) => a._id === action.payload._id
        );

        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })

      /* ================= GLOBAL ERROR (NO ANY) ================= */
      .addMatcher(
        (action): action is { type: string; payload?: string; error?: { message?: string } } =>
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.status = "failed";
          state.error =
            action.payload ||
            action.error?.message ||
            "Something went wrong";
        }
      );
  },
});

export const { clearAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;