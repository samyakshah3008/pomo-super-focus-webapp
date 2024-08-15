import { get } from "@/config/API";
import { userDetailsEndpoint } from "@/constants/APIEndpoints";
import {
  accessTokenKeyBrowserStorage,
  userIdKeyBrowserStorage,
} from "@/constants/browser-storage";
import { getLocalStorageItem } from "@/lib/browser-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  pomoSuperUser: UserDetails | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

interface UserDetails {
  id: string;
  firstName: string;
  email: string;
  lastName: string;
  isGuestUser: boolean;
}

interface FetchUserDataResponse {
  userDetails: UserDetails;
}

export const fetchUserData = createAsyncThunk<FetchUserDataResponse, void>(
  "pomoSuperUser/fetchUser",
  async () => {
    const accessToken = getLocalStorageItem(accessTokenKeyBrowserStorage);
    if (accessToken) {
      const userId = getLocalStorageItem(userIdKeyBrowserStorage);

      const response = await get(userDetailsEndpoint, { userId });
      return { userDetails: response?.data?.data?.currentUser };
    }
    throw new Error("User is not logged in.");
  }
);

const initialState: UserState = {
  pomoSuperUser: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "pomoSuperUser",
  initialState,
  reducers: {
    userSignedIn: (state, action: PayloadAction<UserDetails>) => {
      state.pomoSuperUser = action.payload;
    },
    userSignedOut: (state) => {
      state.pomoSuperUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<FetchUserDataResponse>) => {
          state.pomoSuperUser = action.payload.userDetails;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch user data";
        state.status = "rejected";
      });
  },
});

export const { userSignedIn, userSignedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
