"use client";
import { userIdKeyBrowserStorage } from "@/constants/browser-storage";
import { getLocalStorageItem } from "@/lib/browser-storage";
import {
  fetchActivePomodoroSession,
  updateTimeLeft,
} from "@/lib/store/features/active-pomodoro-session/activePomodoroSessionSlice";
import { fetchDailyProgress } from "@/lib/store/features/daily-progress/dailyProgressSlice";
import { fetchStreakDetails } from "@/lib/store/features/streaks/streakSlice";
import {
  pausePomodoroSessionService,
  resumePomodoroSessionService,
  saveCompletedPomodoroSessionService,
} from "@/services/pomodoros/pomodoro";
import { displayTimeLeft } from "@/utils/super-timer";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDeleteSessionDialog from "./confirm-delete-session";

const ActivePomoSession = () => {
  const [timeLeft, setTimeLeft] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const activePomodoro = useSelector((state: any) => state.activePomodoro);
  const dispatch = useDispatch();

  const userId = getLocalStorageItem(userIdKeyBrowserStorage);

  const resumePomodoroSession = async () => {
    const payload = {
      userId,
      action: "resume",
    };
    try {
      const response = await resumePomodoroSessionService(payload);
      dispatch(fetchActivePomodoroSession());
      setIsPaused(!isPaused);
    } catch (error) {
      console.log(error);
    }
  };

  const pausePomodoroSession = async () => {
    const payload = {
      userId,
      action: "pause",
      timeLeftInSeconds: activePomodoro?.activePomodoroObj?.timeLeftInSeconds,
    };
    try {
      await pausePomodoroSessionService(payload);
      dispatch(fetchActivePomodoroSession());
      setIsPaused(!isPaused);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const saveCompletedPomodoroSession = async () => {
    const payload = {
      userId: userId,
      sessionTime: activePomodoro?.activePomodoroObj?.focusTimeInSeconds / 60,
    };
    try {
      await saveCompletedPomodoroSessionService(payload);
      dispatch(fetchActivePomodoroSession());
      dispatch(fetchDailyProgress());
      dispatch(fetchStreakDetails());
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  const sendNotification = (title: any, options: any) => {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
    }
  };

  if (!activePomodoro?.activePomodoroObj) return null;

  useEffect(() => {
    setTimeLeft(activePomodoro?.activePomodoroObj?.timeLeftInSeconds);
    setIsPaused(activePomodoro?.activePomodoroObj?.isPaused);
  }, []);

  return (
    <>
      <div className="text-base font-bold">Laser Focus Mode Activated</div>
      {/* <div className="text-sm text-muted-foreground">
        Focus on the system and not the output. If system is correct, output
        will for sure.
      </div> */}
      <CountdownCircleTimer
        size={170}
        isPlaying={!isPaused}
        duration={timeLeft}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[90, 60, 40, 20]}
        onUpdate={(remainingTime) => {
          dispatch(updateTimeLeft(remainingTime));
          if (remainingTime >= 0 && remainingTime <= 1) {
            saveCompletedPomodoroSession();
            sendNotification("Pomodoro Session Complete", {
              body: "You've completed a Pomodoro session! Great job!",
            });
          }
        }}
      >
        {({ remainingTime }) => {
          return <div>{displayTimeLeft(remainingTime)}</div>;
        }}
      </CountdownCircleTimer>
      <div className="text-sm">Start focus sesssion</div>
      {isPaused ? (
        <div className="flex gap-2">
          <IconPlayerPlay
            className="cursor-pointer"
            onClick={resumePomodoroSession}
          />
          <IconTrash
            className="cursor-pointer"
            onClick={() => setShowConfirmDialog(true)}
          />
        </div>
      ) : (
        <IconPlayerPause
          className="cursor-pointer"
          onClick={pausePomodoroSession}
        />
      )}

      <ConfirmDeleteSessionDialog
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        userId={userId}
      />
    </>
  );
};

export default ActivePomoSession;
