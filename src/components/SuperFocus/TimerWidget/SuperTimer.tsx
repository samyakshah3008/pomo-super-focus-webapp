"use client";

import { userId } from "@/constants/user";
import { saveCompletedPomodoroSessionService } from "@/services/pomodoros/pomodoro";
import { displayTimeLeft } from "@/utils/super-timer";
import { useCallback, useEffect } from "react";

const SuperTimer = ({
  timeLeftInSeconds,
  setTimeLeftInSeconds,
  isSessionRunning,
  setIsSessionRunning,
  isSessionDetailsLoaded,
  startNewSession,
  setStartNewSession,
  focusTime,
}: any) => {
  const savePomoSuperSession = useCallback(async () => {
    const payload = {
      userId: userId,
      sessionTime: focusTime,
    };
    try {
      const response = await saveCompletedPomodoroSessionService(payload);
    } catch (error) {
      console.log(error, "something went wrong");
    } finally {
      setIsSessionRunning(false);
      setStartNewSession(true);
    }
  }, []);

  useEffect(() => {
    if (!isSessionRunning || !isSessionDetailsLoaded || startNewSession) return;
    let id: any;
    if (timeLeftInSeconds <= 0 && !startNewSession) {
      savePomoSuperSession();
    } else {
      id = setInterval(() => {
        setTimeLeftInSeconds((timeLeft: any) => {
          if (timeLeft >= 1) {
            return timeLeft - 1;
          } else {
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(id);
  }, [timeLeftInSeconds, isSessionRunning]);

  return <div> {displayTimeLeft(timeLeftInSeconds) || "0sec"} </div>;
};

export default SuperTimer;
