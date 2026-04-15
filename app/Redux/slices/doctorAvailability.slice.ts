
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import { doctorAvailabilityApi } from "@/app/lib/api/doctorAvailability.api";
import type { AsyncState } from "../types/common";

/* =========================
   TYPES
========================= */

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface DoctorAvailability {
  _id: string;
  doctor: string;

  day: WeekDay;

  startTime: string;
  endTime: string;

  isAvailable: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface DoctorAvailabilityDTO {
  day: WeekDay;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

/* =========================
   STATE
========================= */

interface DoctorAvailabilityState {
  availability: DoctorAvailability[];

  listState: AsyncState;
  actionState: AsyncState;
}

/* =========================
   INITIAL STATE (FIXED)
========================= */

const initialState: DoctorAvailabilityState = {
  availability: [],

  listState: {
    loading: false,
    error: null,
    status: "idle", // ✅ FIXED
  },

  actionState: {
    loading: false,
    error: null,
    status: "idle", // ✅ FIXED
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
   THUNKS
========================= */

/* GET ALL */
export const fetchAvailability = createAsyncThunk<
  DoctorAvailability[],
  void,
  { rejectValue: string }
>("availability/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await doctorAvailabilityApi.getAll();
    return res as DoctorAvailability[];
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* CREATE */
export const createAvailability = createAsyncThunk<
  DoctorAvailability,
  DoctorAvailabilityDTO,
  { rejectValue: string }
>("availability/create", async (data, thunkAPI) => {
  try {
    const res = await doctorAvailabilityApi.create(data);
    return res as DoctorAvailability;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* UPDATE */
export const updateAvailability = createAsyncThunk<
  DoctorAvailability,
  { id: string; data: Partial<DoctorAvailabilityDTO> },
  { rejectValue: string }
>("availability/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await doctorAvailabilityApi.update(id, data);
    return res as DoctorAvailability;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* DELETE */
export const deleteAvailability = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("availability/delete", async (id, thunkAPI) => {
  try {
    await doctorAvailabilityApi.delete(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

/* =========================
   SLICE
========================= */

const doctorAvailabilitySlice = createSlice({
  name: "doctorAvailability",
  initialState,

  reducers: {
    clearAvailabilityError(state) {
      state.listState.error = null;
      state.actionState.error = null;
    },

    resetAvailability(state) {
      state.availability = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH ================= */
      .addCase(fetchAvailability.pending, (state) => {
        state.listState.loading = true;
        state.listState.status = "loading";
        state.listState.error = null;
      })
      .addCase(
        fetchAvailability.fulfilled,
        (state, action: PayloadAction<DoctorAvailability[]>) => {
          state.listState.loading = false;
          state.listState.status = "succeeded";
          state.availability = action.payload;
        }
      )
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.listState.loading = false;
        state.listState.status = "failed";
        state.listState.error =
          action.payload ?? "Failed to fetch availability";
      })

      /* ================= CREATE ================= */
      .addCase(createAvailability.pending, (state) => {
        state.actionState.loading = true;
        state.actionState.status = "loading";
        state.actionState.error = null;
      })
      .addCase(
        createAvailability.fulfilled,
        (state, action: PayloadAction<DoctorAvailability>) => {
          state.actionState.loading = false;
          state.actionState.status = "succeeded";
          state.availability.push(action.payload);
        }
      )
      .addCase(createAvailability.rejected, (state, action) => {
        state.actionState.loading = false;
        state.actionState.status = "failed";
        state.actionState.error =
          action.payload ?? "Failed to create availability";
      })

      /* ================= UPDATE ================= */
      .addCase(
        updateAvailability.fulfilled,
        (state, action: PayloadAction<DoctorAvailability>) => {
          const index = state.availability.findIndex(
            (item) => item._id === action.payload._id
          );

          if (index !== -1) {
            state.availability[index] = action.payload;
          }
        }
      )

      /* ================= DELETE ================= */
      .addCase(
        deleteAvailability.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.availability = state.availability.filter(
            (item) => item._id !== action.payload
          );
        }
      )

      /* ================= GLOBAL MATCHERS ================= */
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.listState.loading = true;
          state.listState.status = "loading";

          state.actionState.loading = true;
          state.actionState.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.listState.loading = false;
          state.listState.status = "succeeded";

          state.actionState.loading = false;
          state.actionState.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.listState.loading = false;
          state.listState.status = "failed";
          state.listState.error = action.payload || "Error";

          state.actionState.loading = false;
          state.actionState.status = "failed";
          state.actionState.error = action.payload || "Error";
        }
      );
  },
});

/* =========================
   EXPORTS
========================= */

export const {
  clearAvailabilityError,
  resetAvailability,
} = doctorAvailabilitySlice.actions;

export default doctorAvailabilitySlice.reducer;