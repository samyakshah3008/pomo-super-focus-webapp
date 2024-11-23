"use client";

import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchUserData());
    // storeRef.current.dispatch(fetchDailyProgress());
    // storeRef.current.dispatch(fetchStreakDetails());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
