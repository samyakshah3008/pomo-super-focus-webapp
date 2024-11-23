import { get } from "@/config/API";
import { userDetailsEndpoint } from "@/constants/APIEndpoints";
import {
  accessTokenKeyBrowserStorage,
  refreshTokenKeyBrowserStorage,
  userIdKeyBrowserStorage,
} from "@/constants/browser-storage";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/lib/browser-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";

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

export const fetchUserData: any = createAsyncThunk<FetchUserDataResponse, void>(
  "pomoSuperUser/fetchUser",
  async () => {
    const accessToken = getLocalStorageItem(accessTokenKeyBrowserStorage);
    if (accessToken) {
      const response = await get(userDetailsEndpoint);
      return { userDetails: response?.data?.data?.currentUser };
    }
    throw new Error("User is not logged in.");
  }
);

export const logoutUser: any = createAsyncThunk(
  "pomoSuperUser/logoutUser",
  async () => {
    removeLocalStorageItem(accessTokenKeyBrowserStorage);
    removeLocalStorageItem(userIdKeyBrowserStorage);
    removeLocalStorageItem(refreshTokenKeyBrowserStorage);

    deleteCookie(accessTokenKeyBrowserStorage);
    deleteCookie(userIdKeyBrowserStorage);
    deleteCookie(refreshTokenKeyBrowserStorage);
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
