"use client";

import { fetchActivePomodoroSession } from "@/lib/store/features/active-pomodoro-session/activePomodoroSessionSlice";
import { fetchDailyProgress } from "@/lib/store/features/daily-progress/dailyProgressSlice";
import { fetchStreakDetails } from "@/lib/store/features/streaks/streakSlice";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchUserData()),
      storeRef.current.dispatch(fetchDailyProgress());
    storeRef.current.dispatch(fetchStreakDetails());
    storeRef.current.dispatch(fetchActivePomodoroSession());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
