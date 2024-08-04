"use client";

import { userId } from "@/constants/user";
import useBeforeUnload from "@/hooks/useBeforeUnload";
import {
  deleteActivePomodoroSessionService,
  getActivePomodoroSessionService,
  initiateActivePomodoroSessionService,
  pausePomodoroSessionService,
  resumePomodoroSessionService,
} from "@/services/pomodoros/pomodoro";
import { convertMinutesToSeconds } from "@/utils/super-timer";
import { useEffect, useState } from "react";
import SuperTimer from "./super-timer";

const states = ["Pomodoro", "Short break", "Long break"];

const SuperTimerWidget = ({ startNewSession, setStartNewSession }: any) => {
  const [focusTime, setFocusTime] = useState(5);
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);
  const [isSessionRunning, setIsSessionRunning] = useState(false);
  const [isSessionDetailsLoaded, setIsSessionDetailsLoaded] = useState(false);

  const focusTimeChangeHandler = (e: any) => {
    setFocusTime(e.target.value);
  };

  const startSessionClickHandler = () => {
    initiateActivePomodoroSession();
  };

  const pauseOrResumeClickHandler = () => {
    setIsSessionRunning(!isSessionRunning);
    if (isSessionRunning) {
      pausePomodoroSession();
    } else {
      resumePomodoroSession();
    }
  };

  const restartSessionClickHandler = () => {
    deleteActivePomodoroSession();
  };

  const initiateActivePomodoroSession = async () => {
    let focusTimeInSeconds = convertMinutesToSeconds(focusTime);

    try {
      const payload = {
        userId,
        focusTimeInSeconds,
      };
      const response = await initiateActivePomodoroSessionService(payload);
      setIsSessionRunning(true);
      setTimeLeftInSeconds(focusTimeInSeconds);
      setStartNewSession(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBeforeUnload = async () => {
    if (!timeLeftInSeconds) return null;
    const payload = {
      userId,
      action: "pause",
      timeLeftInSeconds,
    };
    try {
      await pausePomodoroSessionService(payload);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const resumePomodoroSession = async () => {
    const payload = {
      userId,
      action: "resume",
    };
    try {
      const response = await resumePomodoroSessionService(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const pausePomodoroSession = async () => {
    const payload = {
      userId,
      action: "pause",
      timeLeftInSeconds,
    };
    try {
      await pausePomodoroSessionService(payload);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const getActivePomodoroSession = async () => {
    const queryParam = {
      userId,
    };
    try {
      const response = await getActivePomodoroSessionService(queryParam);
      if (!response.data?.data?.found) {
        setStartNewSession(true);
        setTimeLeftInSeconds(0);
      } else {
        const currentPomodoro = response.data?.data?.currentPomodoro;
        setStartNewSession(false);
        setTimeLeftInSeconds(currentPomodoro?.timeLeftInSeconds);
      }
    } catch (error) {
      console.log("Error in getting active pomodoro session", error);
    } finally {
      setIsSessionDetailsLoaded(true);
    }
  };

  const deleteActivePomodoroSession = async () => {
    const queryParam = {
      userId,
    };

    try {
      await deleteActivePomodoroSessionService(queryParam);
      setStartNewSession(true);
      setTimeLeftInSeconds(0);
    } catch (error) {
      console.log(error);
    }
  };

  useBeforeUnload(handleBeforeUnload);

  useEffect(() => {
    getActivePomodoroSession();
  }, []);

  if (!isSessionDetailsLoaded) return;

  return (
    <div>
      <input
        style={{ border: "2px solid black" }}
        type="number"
        value={focusTime}
        onChange={focusTimeChangeHandler}
      />
      <SuperTimer
        timeLeftInSeconds={timeLeftInSeconds}
        setTimeLeftInSeconds={setTimeLeftInSeconds}
        isSessionRunning={isSessionRunning}
        setIsSessionRunning={setIsSessionRunning}
        isSessionDetailsLoaded={isSessionDetailsLoaded}
        startNewSession={startNewSession}
        setStartNewSession={setStartNewSession}
        focusTime={focusTime}
      />
      {startNewSession ? (
        <button onClick={startSessionClickHandler}>
          Start a focus session
        </button>
      ) : null}

      <br />
      {!startNewSession ? (
        <button onClick={pauseOrResumeClickHandler}>
          {isSessionRunning ? "Pause" : "Resume"}
        </button>
      ) : null}

      <br />

      {!startNewSession ? (
        <button onClick={restartSessionClickHandler}>Restart session</button>
      ) : null}
    </div>
  );
};

export default SuperTimerWidget;
