"use client";

import { userIdKeyBrowserStorage } from "@/constants/browser-storage";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import { getLocalStorageItem } from "@/lib/browser-storage";
import { pausePomodoroSessionService } from "@/services/pomodoros/pomodoro";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ActivePomoSession from "./active-pomo-session";
import StartPomoSession from "./start-pomo-session";

const SuperTimerWidget = () => {
  const userId = getLocalStorageItem(userIdKeyBrowserStorage);

  const activePomodoro = useSelector((state: any) => state.activePomodoro);

  const handleBeforeUnload = async () => {
    if (activePomodoro?.activePomodoroObj?.isPaused) {
      return;
    } else {
      const payload = {
        userId,
        action: "pause",
        timeLeftInSeconds: activePomodoro?.activePomodoroObj?.timeLeftInSeconds,
      };
      try {
        await pausePomodoroSessionService(payload);
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };

  useBeforeUnload(handleBeforeUnload);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  if (activePomodoro?.status == "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4 w-[500px]">
      {!activePomodoro?.isActive ? <StartPomoSession /> : <ActivePomoSession />}
    </div>
  );
};

export default SuperTimerWidget;
