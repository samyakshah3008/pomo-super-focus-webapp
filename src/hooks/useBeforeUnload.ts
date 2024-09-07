"use client";

import { useEffect } from "react";

const useBeforeUnload = (callback: any) => {
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      callback();
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [callback]);
};

export default useBeforeUnload;
