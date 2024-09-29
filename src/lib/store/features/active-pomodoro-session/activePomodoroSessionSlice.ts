import {
  accessTokenKeyBrowserStorage,
  userIdKeyBrowserStorage,
} from "@/constants/browser-storage";
import { getLocalStorageItem } from "@/lib/browser-storage";
import { getActivePomodoroSessionService } from "@/services/pomodoros/pomodoro";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  activePomodoroObj: null,
  status: "idle",
  error: null,
  isActive: false,
};

export const fetchActivePomodoroSession: any = createAsyncThunk<any>(
  "pomoSuperUser/activePomodoro",
  async () => {
    const accessToken = getLocalStorageItem(accessTokenKeyBrowserStorage);
    if (accessToken) {
      const userId = getLocalStorageItem(userIdKeyBrowserStorage);

      const response = await getActivePomodoroSessionService({ userId });

      return response?.data?.data;
    }
    throw new Error("User is not logged in.");
  }
);

export const activePomodoroSessionSlice: any = createSlice({
  name: "activePomodoroSession",
  initialState,
  reducers: {
    updateTimeLeft: (state, action: PayloadAction<any>) => {
      state.activePomodoroObj.timeLeftInSeconds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivePomodoroSession.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchActivePomodoroSession.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (!action.payload?.found) {
            state.isActive = false;
            state.status = "fulfilled";
          } else {
            state.activePomodoroObj = action.payload?.currentPomodoro;
            state.isActive = true;
            state.status = "fulfilled";
          }
        }
      )
      .addCase(fetchActivePomodoroSession.rejected, (state, action) => {
        state.error =
          action.error.message ||
          "Failed to fetch active pomodoro session details";
        state.status = "rejected";
      });
  },
});

export const { updateTimeLeft } = activePomodoroSessionSlice.actions;
export const activePomodoroReducer = activePomodoroSessionSlice.reducer;
