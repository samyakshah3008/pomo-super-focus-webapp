"use client";

import {
  getBorderClass,
  getColorClass,
} from "@/components/(super-focus)/helper";
import { useToast } from "@/components/ui/primitives/use-toast";
import { useSuperFocus } from "@/context/super-focus";
import { cn } from "@/lib/utils";
import {
  addNewPomodoroSessionService,
  deletePomodoroSessionService,
  initializeActivePomodoroSessionService,
  pausePomodoroSessionService,
  resumePomodoroSessionService,
} from "@/services/super-focus/super-focus";
import { IconPlayerSkipBack, IconPlayerSkipForward } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { getTimeInMinutesAndSecondsFormat } from "./helper";

const SuperFocusTimer = ({
  currentSettingDetails,
  shortBreakTime,
  longBreakTime,
  studyTime,
  setStudyTime,
  setLongBreakTime,
  setShortBreakTime,
  isStudyTimerPaused,
  setIsStudyTimerPaused,
  setIsStudyTimeInitialized,
  isStudyTimeInitialized,
}: any) => {
  const [isShortBreakTimerPaused, setIsShortBreakTimerPaused] = useState(true);
  const [isLongBreakTimerPaused, setIsLongBreakTimerPaused] = useState(true);
  const [isShortBreakSessionInitialized, setIsShortBreakSessionInitialized] =
    useState(false);
  const [isLongBreakSessionInitialized, setIsLongBreakSessionInitialized] =
    useState(false);

  const hasSavedPomodoro = useRef(false);

  const { getColor, setActiveState, activeState } = useSuperFocus();
  let themeColor = getColor();
  const colorClass = getColorClass(themeColor);
  const borderClass = getBorderClass(themeColor);

  const { toast } = useToast();

  const showTimeAccordingToState = () => {
    if (activeState == "study") {
      return getTimeInMinutesAndSecondsFormat(studyTime);
    } else if (activeState == "shortBreak") {
      return getTimeInMinutesAndSecondsFormat(shortBreakTime);
    } else {
      return getTimeInMinutesAndSecondsFormat(longBreakTime);
    }
  };

  const getTextAccordingToState = () => {
    if (activeState == "study") {
      if (isStudyTimeInitialized) {
        if (isStudyTimerPaused) {
          return "Resume";
        } else {
          return "Pause";
        }
      } else {
        return "Start";
      }
    } else if (activeState == "shortBreak") {
      if (isShortBreakSessionInitialized) {
        if (isShortBreakTimerPaused) {
          return "Resume";
        } else {
          return "Pause";
        }
      } else {
        return "Start";
      }
    } else {
      if (isLongBreakSessionInitialized) {
        if (isLongBreakTimerPaused) {
          return "Resume";
        } else {
          return "Pause";
        }
      } else {
        return "Start";
      }
    }
  };

  const checkIsActive = (sessionType: any): boolean => {
    if (sessionType == activeState) {
      return true;
    }
    return false;
  };

  const startTimerAccordingToState = async () => {
    if (activeState == "study") {
      if (isStudyTimeInitialized) {
        try {
          await resumePomodoroSessionService({
            action: "resume",
            timeLeftInSeconds: studyTime,
          });
          toast({
            title: "Session resumed!✅",
            description:
              "We have resumed your session, time to do laser focus work!",
          });
          setIsStudyTimerPaused(false);
        } catch (error) {
          toast({
            title: "Failed to resume the session, please try again later! ❌",
            description:
              "Uh oh! we are very sorry but something is wrong with our server, we will fix this soon!",
            variant: "destructive",
          });
        }
      } else {
        try {
          await initializeActivePomodoroSessionService(
            currentSettingDetails?.time?.studyTime * 60
          );
          toast({
            title: "Session started! Good luck for the session!✅",
            description: "New session started! We wish you all the very best!",
          });
          setIsStudyTimerPaused(false);
          setIsStudyTimeInitialized(true);
        } catch (error) {
          toast({
            title: "Failed to start a session, please try again later!",
            description:
              "Uh oh! we are very sorry but something is wrong with our server, we will fix this soon!",
            variant: "destructive",
          });
        }
      }
    } else if (activeState == "shortBreak") {
      setIsShortBreakSessionInitialized(true);
      setIsShortBreakTimerPaused(false);
    } else {
      setIsLongBreakSessionInitialized(true);
      setIsLongBreakTimerPaused(false);
    }
  };

  const pauseTimerAccordingToState = async () => {
    if (activeState == "study") {
      try {
        await pausePomodoroSessionService({
          action: "pause",
          timeLeftInSeconds: studyTime,
        });
        setIsStudyTimerPaused(true);
        toast({
          title: "Session paused!✅",
          description:
            "We have paused the session, waiting for you to come back soon!",
        });
      } catch (error) {
        toast({
          title: "Failed to pause a session, please try again later!",
          description:
            "Uh oh! we are very sorry but something is wrong with our server, we will fix this soon!",
          variant: "destructive",
        });
      }
    } else if (activeState == "shortBreak") {
      setIsShortBreakTimerPaused(true);
    } else {
      setIsLongBreakTimerPaused(true);
    }
  };

  const savePomodoroSessionToDB = async () => {
    try {
      await addNewPomodoroSessionService(
        currentSettingDetails?.time?.studyTime
      );
      toast({
        title: "Congratulations, you completed focused session!",
        description:
          "You are looking in fine touch today! keep going and win the day!",
      });
    } catch (error) {
      toast({
        title:
          "Uh oh, we failed to store your pomodoro session, we will soon get back to it!",
        description:
          "Uh oh! we are very sorry but something is wrong with our server, we will fix this soon!",
        variant: "destructive",
      });
    } finally {
      // check with number of sessions
      hasSavedPomodoro.current = false;

      let switchToShortBreak = true;
      if (switchToShortBreak) {
        let autoStartTimer =
          currentSettingDetails?.breakOptions?.autoStartBreakTimer;
        setActiveState("shortBreak");
        if (autoStartTimer) {
          setIsShortBreakSessionInitialized(true);
          setIsShortBreakTimerPaused(false);
        }
        // else we wont initialize
        toast({
          title: "Take a short break and come back!",
          description:
            "It's time for the short break, you can do some push ups or stretching before you start next session;)",
        });
      } else {
        let autoStartTimer =
          currentSettingDetails?.breakOptions?.autoStartBreakTimer;
        setActiveState("longBreak");
        if (autoStartTimer) {
          setIsLongBreakSessionInitialized(true);
          setIsLongBreakTimerPaused(false);
        }
        toast({
          title: "Take long break!",
          description:
            "Take a long break and recharge yourself before your next session!",
        });
      }
    }
  };

  const switchTab = async (tab: any) => {
    if (tab == "study") {
      setActiveState("study");
      setIsLongBreakSessionInitialized(false);
      setIsLongBreakTimerPaused(true);
      setIsShortBreakSessionInitialized(false);
      setIsShortBreakTimerPaused(true);
      setShortBreakTime(currentSettingDetails?.time?.shortBreak * 60);
      setLongBreakTime(currentSettingDetails?.time?.longBreak * 60);
    } else if (tab == "shortBreak") {
      setActiveState("shortBreak");
      if (isStudyTimeInitialized) {
        try {
          await deletePomodoroSessionService();
          setStudyTime(currentSettingDetails?.time?.studyTime * 60);
        } catch (error) {
          console.log("Failed to delete pomodoro", error);
        }
      }
      setIsStudyTimeInitialized(false);
      setIsStudyTimerPaused(true);
      setIsLongBreakSessionInitialized(false);
      setIsLongBreakTimerPaused(true);

      setLongBreakTime(currentSettingDetails?.time?.longBreak * 60);
    } else {
      setActiveState("longBreak");
      if (isStudyTimeInitialized) {
        try {
          await deletePomodoroSessionService();
          setStudyTime(currentSettingDetails?.time?.studyTime * 60);
        } catch (error) {
          console.log("Failed to delete pomodoro", error);
        }
      }
      setIsStudyTimeInitialized(false);
      setIsStudyTimerPaused(true);
      setIsShortBreakSessionInitialized(false);
      setIsShortBreakTimerPaused(true);
      setShortBreakTime(currentSettingDetails?.time?.shortBreak * 60);
    }
  };

  useEffect(() => {
    if (isStudyTimerPaused) return;
    let id = setInterval(() => {
      setStudyTime((studyTime: any) => {
        if (studyTime <= 1) {
          if (!hasSavedPomodoro.current) {
            setIsStudyTimeInitialized(false);
            setIsStudyTimerPaused(true);
            setStudyTime(currentSettingDetails?.time?.studyTime * 60);
            hasSavedPomodoro.current = true;
            savePomodoroSessionToDB();
            return 0;
          }
        }

        return studyTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isStudyTimerPaused]);

  useEffect(() => {
    if (isShortBreakTimerPaused) return;

    let id = setInterval(() => {
      setShortBreakTime((prevTime: number) => {
        if (prevTime <= 1) {
          let autoStartTimer =
            currentSettingDetails?.studyOptions?.autoStartStudyTimer;
          setActiveState("study");
          setShortBreakTime(currentSettingDetails?.time?.shortBreak * 60);
          setIsShortBreakSessionInitialized(false);
          setIsShortBreakTimerPaused(true);
          if (autoStartTimer) {
            setIsStudyTimeInitialized(true);
            setIsStudyTimerPaused(false);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isShortBreakTimerPaused]);

  useEffect(() => {
    if (isLongBreakTimerPaused) return;

    let id = setInterval(() => {
      setLongBreakTime((prevTime: number) => {
        if (prevTime <= 1) {
          let autoStartTimer =
            currentSettingDetails?.studyOptions?.autoStartStudyTimer;
          setActiveState("study");
          setLongBreakTime(currentSettingDetails?.time?.longBreak * 60);
          setIsLongBreakSessionInitialized(false);
          setIsLongBreakTimerPaused(true);
          if (autoStartTimer) {
            setIsStudyTimeInitialized(true);
            setIsStudyTimerPaused(false);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isLongBreakTimerPaused]);

  return (
    <div
      className={cn(
        `w-full flex flex-col gap-5 bg-[#181c25cc] text-white border-2 ${borderClass} border-solid items-center rounded-3xl`
      )}
    >
      <div>
        <h1 className="text-[120px] text-center ">
          {showTimeAccordingToState()}
        </h1>
        <div className="flex gap-4 justify-center items-center">
          <IconPlayerSkipBack size={24} className="cursor-pointer" />
          <button
            onClick={
              getTextAccordingToState() == "Resume" ||
              getTextAccordingToState() == "Start"
                ? startTimerAccordingToState
                : pauseTimerAccordingToState
            }
            className={cn(
              `border-2 font-bold bg-transparent ${borderClass} pl-8 pr-8 pt-4 pb-4 rounded-md uppercase`
            )}
          >
            {getTextAccordingToState()}
          </button>
          <IconPlayerSkipForward className="cursor-pointer" />
        </div>
      </div>

      <div className="flex pb-5">
        <div
          className={cn(
            `pt-4 pb-4 pr-10 pl-10 ${borderClass} border-2 border-solid border-r-0 cursor-pointer rounded-tl-md rounded-bl-md ${
              checkIsActive("study") && "underline"
            }`
          )}
          onClick={() => switchTab("study")}
        >
          Study
        </div>
        <div
          className={cn(
            `pt-4 pb-4 pr-10 pl-10 ${borderClass} border-2 border-solid cursor-pointer ${
              checkIsActive("shortBreak") && "underline"
            }`
          )}
          onClick={() => switchTab("shortBreak")}
        >
          Short break
        </div>
        <div
          className={cn(
            `pt-4 pb-4 pr-10 pl-10 ${borderClass} border-2 border-solid border-l-0 cursor-pointer rounded-tr-md rounded-br-md ${
              checkIsActive("longBreak") && "underline"
            }`
          )}
          onClick={() => switchTab("longBreak")}
        >
          Long break
        </div>
      </div>
    </div>
  );
};

export default SuperFocusTimer;
