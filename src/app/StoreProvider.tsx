"use client";

import { AppStore, makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // add initial state
    // storeRef.current.dispatch();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
