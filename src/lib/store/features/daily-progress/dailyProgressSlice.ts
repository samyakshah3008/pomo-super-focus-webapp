import { get } from "@/config/API";
import { dailyProgressEndpoint } from "@/constants/APIEndpoints";
import {
  accessTokenKeyBrowserStorage,
  userIdKeyBrowserStorage,
} from "@/constants/browser-storage";
import { getLocalStorageItem } from "@/lib/browser-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DailyProgress {
  today: {
    sessions: Number;
    totalTime: Number;
  };
  yesterday: {
    sessions: Number;
    totalTime: Number;
  };
}

export interface DailyProgressWidgetDetails {
  dailyProgressDetails: DailyProgress;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}
const initialState: any = {
  dailyProgressDetails: null,
  status: "idle",
  error: null,
};

export const fetchDailyProgress = createAsyncThunk<any>(
  "pomoSuperUser/dailyProgress",
  async () => {
    const accessToken = getLocalStorageItem(accessTokenKeyBrowserStorage);
    if (accessToken) {
      const userId = getLocalStorageItem(userIdKeyBrowserStorage);

      const response = await get(dailyProgressEndpoint, { userId });
      return response?.data?.data;
    }
    throw new Error("User is not logged in.");
  }
);

export const dailyProgressSlice = createSlice({
  name: "dailyProgress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyProgress.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchDailyProgress.fulfilled,
        (state, action: PayloadAction<DailyProgressWidgetDetails>) => {
          state.dailyProgressDetails = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchDailyProgress.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch daily progress";
        state.status = "rejected";
      });
  },
});

export const {} = dailyProgressSlice.actions;
export const dailyProgressReducer = dailyProgressSlice.reducer;