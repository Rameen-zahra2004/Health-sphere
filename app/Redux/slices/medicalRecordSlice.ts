import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { medicalRecordService } from "@/app/services/medicalRecord";

import type {
  MedicalRecord,
  MedicalRecordPayload,
} from "@/app/types/medicalRecord";

import type { AsyncState } from "../types/common";

/* ================= ERROR HANDLER ================= */

interface ApiError {
  message?: string;
}

const getErrorMessage = (err: unknown): string => {
  const error = err as {
    response?: { data?: ApiError };
    message?: string;
  };

  return (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
};

/* ================= STATE ================= */

interface MedicalRecordState {
  records: MedicalRecord[];
  selectedRecord: MedicalRecord | null;

  listState: AsyncState;
  detailState: AsyncState;
  actionState: AsyncState;
}

/* ================= INITIAL STATE (FIXED) ================= */

const initialState: MedicalRecordState = {
  records: [],
  selectedRecord: null,

  listState: {
    loading: false,
    error: null,
    status: "idle", // ✅ FIXED
  },

  detailState: {
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

/* ================= THUNKS ================= */

/* GET MY RECORDS */
export const fetchMyRecords = createAsyncThunk<
  MedicalRecord[],
  void,
  { rejectValue: string }
>("medicalRecords/fetchMy", async (_, thunkAPI) => {
  try {
    const res = await medicalRecordService.getMy();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMessage(err));
  }
});

/* CREATE RECORD */
export const createRecord = createAsyncThunk<
  MedicalRecord,
  MedicalRecordPayload,
  { rejectValue: string }
>("medicalRecords/create", async (data, thunkAPI) => {
  try {
    const res = await medicalRecordService.create(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMessage(err));
  }
});

/* GET BY ID */
export const fetchRecordById = createAsyncThunk<
  MedicalRecord,
  string,
  { rejectValue: string }
>("medicalRecords/getById", async (id, thunkAPI) => {
  try {
    const res = await medicalRecordService.getById(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMessage(err));
  }
});

/* DELETE */
export const deleteRecord = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("medicalRecords/delete", async (id, thunkAPI) => {
  try {
    await medicalRecordService.remove(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(getErrorMessage(err));
  }
});

/* ================= SLICE ================= */

const medicalRecordSlice = createSlice({
  name: "medicalRecords",
  initialState,

  reducers: {
    clearSelectedRecord(state) {
      state.selectedRecord = null;
    },

    clearError(state) {
      state.listState.error = null;
      state.detailState.error = null;
      state.actionState.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= LIST ================= */
      .addCase(fetchMyRecords.pending, (state) => {
        state.listState.loading = true;
        state.listState.status = "loading";
        state.listState.error = null;
      })
      .addCase(fetchMyRecords.fulfilled, (state, action) => {
        state.listState.loading = false;
        state.listState.status = "succeeded";
        state.records = action.payload;
      })
      .addCase(fetchMyRecords.rejected, (state, action) => {
        state.listState.loading = false;
        state.listState.status = "failed";
        state.listState.error =
          action.payload ?? "Failed to fetch records";
      })

      /* ================= CREATE ================= */
      .addCase(createRecord.pending, (state) => {
        state.actionState.loading = true;
        state.actionState.status = "loading";
        state.actionState.error = null;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.actionState.loading = false;
        state.actionState.status = "succeeded";
        state.records.unshift(action.payload);
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.actionState.loading = false;
        state.actionState.status = "failed";
        state.actionState.error =
          action.payload ?? "Failed to create record";
      })

      /* ================= GET BY ID ================= */
      .addCase(fetchRecordById.pending, (state) => {
        state.detailState.loading = true;
        state.detailState.status = "loading";
        state.detailState.error = null;
      })
      .addCase(fetchRecordById.fulfilled, (state, action) => {
        state.detailState.loading = false;
        state.detailState.status = "succeeded";
        state.selectedRecord = action.payload;
      })
      .addCase(fetchRecordById.rejected, (state, action) => {
        state.detailState.loading = false;
        state.detailState.status = "failed";
        state.detailState.error =
          action.payload ?? "Failed to fetch record";
      })

      /* ================= DELETE ================= */
      .addCase(deleteRecord.pending, (state) => {
        state.actionState.loading = true;
        state.actionState.status = "loading";
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.actionState.loading = false;
        state.actionState.status = "succeeded";
        state.records = state.records.filter(
          (r) => r._id !== action.payload
        );
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.actionState.loading = false;
        state.actionState.status = "failed";
        state.actionState.error =
          action.payload ?? "Failed to delete record";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearSelectedRecord, clearError } =
  medicalRecordSlice.actions;

export default medicalRecordSlice.reducer;