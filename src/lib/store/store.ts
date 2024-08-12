import { configureStore } from "@reduxjs/toolkit";
import { dailyProgressReducer } from "./features/daily-progress/dailyProgressSlice";
import { streakDetailsReducer } from "./features/streaks/streakSlice";
import { userReducer } from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      dailyProgress: dailyProgressReducer,
      streakDetails: streakDetailsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
