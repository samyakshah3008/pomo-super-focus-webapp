import { get } from "@/config/API";
import { streakDetailsEndpoint } from "@/constants/APIEndpoints";
import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getLocalStorageItem } from "@/lib/browser-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  streakDetails: null,
  status: "idle",
  error: null,
};

export const fetchStreakDetails: any = createAsyncThunk<any>(
  "pomoSuperUser/streakDetails",
  async () => {
    const accessToken = getLocalStorageItem(accessTokenKeyBrowserStorage);
    const currentDate = new Date().toISOString();
    if (accessToken) {
      const response = await get(streakDetailsEndpoint, {
        currentDate,
      });
      return response?.data?.data?.streakDetails;
    }
    throw new Error("User is not logged in.");
  }
);

export const streakSlice: any = createSlice({
  name: "streakDetails",
  initialState,
  reducers: {
    updateStreakDetails: (state, action: PayloadAction<any>) => {
      state.streakDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreakDetails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchStreakDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.streakDetails = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchStreakDetails.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch streak details";
        state.status = "rejected";
      });
  },
});

export const { updateStreakDetails } = streakSlice.actions;
export const streakDetailsReducer = streakSlice.reducer;
