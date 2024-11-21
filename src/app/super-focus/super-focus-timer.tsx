"use client";

import CongratulationsModal from "@/components/(super-focus)/congratulations-modal";
import EscapeSessionModal from "@/components/(super-focus)/escape-session-modal";
import LongBreakSessionActivatedModal from "@/components/(super-focus)/long-break-modal";
import PauseStudySessionModal from "@/components/(super-focus)/pause-modal";
import ResetSessionModal from "@/components/(super-focus)/reset-timer-modal";
import ShortBreakSessionActivatedModal from "@/components/(super-focus)/short-break-modal";
import StudySessionActivatedModal from "@/components/(super-focus)/study-modal";
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
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { getTimeInMinutesAndSecondsFormat } from "./helper";
import TimerWidget from "./timer-widget";

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

  const [showStudySessionActivatedModal, setShowStudySessionActivatedModal] =
    useState(false);
  const [
    showShortBreakSessionActivatedModal,
    setShowShortBreakSessionActivatedModal,
  ] = useState(false);
  const [
    showLongBreakSessionActivatedModal,
    setShowLongBreakSessionActivatedModal,
  ] = useState(false);
  const [showEscapeSessionModal, setShowEscapeSessionModal] = useState(false);
  const [showResetSessionModal, setShowResetSessionModal] = useState(false);
  const [showPauseSessionModal, setShowPauseSessionModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);

  const hasSavedPomodoro = useRef(false);

  const { setActiveState, activeState } = useSuperFocus();

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

  const getTextAccordingToState: any = () => {
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

          setIsStudyTimerPaused(false);
          setIsStudyTimeInitialized(true);
          setShowStudySessionActivatedModal(true);
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
      setShowShortBreakSessionActivatedModal(true);
    } else {
      setIsLongBreakSessionInitialized(true);
      setIsLongBreakTimerPaused(false);
      setShowLongBreakSessionActivatedModal(true);
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
        setShowPauseSessionModal(true);
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
    let response;
    try {
      response = await addNewPomodoroSessionService(
        currentSettingDetails?.time?.studyTime
      );
      setShowCongratulationsModal(true);
    } catch (error) {
      toast({
        title:
          "Uh oh, we failed to store your pomodoro session, we will soon get back to it!",
        description:
          "Uh oh! we are very sorry but something is wrong with our server, we will fix this soon!",
        variant: "destructive",
      });
    } finally {
      hasSavedPomodoro.current = false;

      if (response?.shouldGoToLongBreak) {
        // let autoStartTimer =
        //   currentSettingDetails?.breakOptions?.autoStartBreakTimer;
        let autoStartTimer = false;
        setActiveState("longBreak");
        if (autoStartTimer) {
          setIsLongBreakSessionInitialized(true);
          setIsLongBreakTimerPaused(false);
        }
      } else {
        // let autoStartTimer =
        //   currentSettingDetails?.breakOptions?.autoStartBreakTimer;
        let autoStartTimer = false;
        setActiveState("shortBreak");
        if (autoStartTimer) {
          setIsShortBreakSessionInitialized(true);
          setIsShortBreakTimerPaused(false);
        }
        // else we wont initialize
      }
    }
  };

  const resetSession = async () => {
    try {
      await deletePomodoroSessionService();
      setStudyTime(currentSettingDetails?.time?.studyTime * 60);
      setIsStudyTimeInitialized(false);
      setIsStudyTimerPaused(true);
      setShowResetSessionModal(false);
      toast({
        title: "Session reset done ✅",
        description: "Now you can take break if you want. ",
      });
    } catch (error) {
      console.log("Failed to delete pomodoro", error);
    } finally {
      setShowResetSessionModal(false);
    }
  };

  const resetShortBreakTime = () => {
    setIsShortBreakSessionInitialized(false);
    setIsShortBreakTimerPaused(true);
    setShortBreakTime(currentSettingDetails?.time?.shortBreak * 60);
  };

  const resetLongBreakTime = () => {
    setIsLongBreakSessionInitialized(false);
    setIsLongBreakTimerPaused(true);
    setLongBreakTime(currentSettingDetails?.time?.longBreak * 60);
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
      if (isStudyTimeInitialized) {
        setShowEscapeSessionModal(true);
      } else {
        setActiveState("shortBreak");
        setIsStudyTimeInitialized(false);
        setIsStudyTimerPaused(true);
        setIsLongBreakSessionInitialized(false);
        setIsLongBreakTimerPaused(true);
        setLongBreakTime(currentSettingDetails?.time?.longBreak * 60);
      }
    } else {
      if (isStudyTimeInitialized) {
        setShowEscapeSessionModal(true);
      } else {
        setActiveState("longBreak");
        setIsStudyTimeInitialized(false);
        setIsStudyTimerPaused(true);
        setIsShortBreakSessionInitialized(false);
        setIsShortBreakTimerPaused(true);
        setShortBreakTime(currentSettingDetails?.time?.shortBreak * 60);
      }
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
          setShowShortBreakSessionActivatedModal(true);
          if (autoStartTimer) {
            setIsStudyTimeInitialized(true);
            setIsStudyTimerPaused(false);
            setShowStudySessionActivatedModal(true);
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
          setShowLongBreakSessionActivatedModal(true);
          if (autoStartTimer) {
            setIsStudyTimeInitialized(true);
            setIsStudyTimerPaused(false);
            setShowStudySessionActivatedModal(true);
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
    <>
      <div
        className={cn(
          `flex flex-col gap-5 border-2 ${
            activeState == "study"
              ? "bg-blue-100"
              : activeState == "shortBreak"
              ? "bg-yellow-100"
              : "bg-green-100"
          } border-solid rounded-3xl w-[500px] p-4`
        )}
      >
        <div className="flex gap-2 text-sm font-medium">
          <div
            className={`p-2 cursor-pointer ${
              checkIsActive("study") &&
              `rounded-full ${
                activeState == "study"
                  ? "bg-blue-400 border-blue-500"
                  : activeState == "shortBreak"
                  ? "bg-yellow-400 border-yellow-500"
                  : "bg-green-400 border-green-500"
              }   pl-4 pr-4 text-white font-semibold flex gap-1 items-center`
            }`}
            onClick={() => switchTab("study")}
          >
            {activeState == "study" && <IconCheck size={20} />} Study
          </div>
          <div
            className={`p-2 cursor-pointer ${
              checkIsActive("shortBreak") &&
              `rounded-full ${
                activeState == "study"
                  ? "bg-blue-400 border-blue-500"
                  : activeState == "shortBreak"
                  ? "bg-yellow-400 border-yellow-500"
                  : "bg-green-400 border-green-500"
              } pl-4 pr-4 text-white font-semibold flex gap-1`
            }`}
            onClick={() => switchTab("shortBreak")}
          >
            Short Break
          </div>
          <div
            className={`p-2 cursor-pointer ${
              checkIsActive("longBreak") &&
              `rounded-full ${
                activeState == "study"
                  ? "bg-blue-400 border-blue-500"
                  : activeState == "shortBreak"
                  ? "bg-yellow-400 border-yellow-500"
                  : "bg-green-400 border-green-500"
              } pl-4 pr-4 text-white font-semibold flex gap-1`
            }`}
            onClick={() => switchTab("longBreak")}
          >
            Long Break
          </div>
        </div>
        <div className="flex justify-center items-center flex-1">
          <div className="">
            <h1 className="text-4xl text-center">
              {showTimeAccordingToState()}
            </h1>
            <div className="w-full border-2 border-gray-300 mt-1"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <TimerWidget
            isStudyTimeInitialized={isStudyTimeInitialized}
            getTextAccordingToState={getTextAccordingToState}
            startTimerAccordingToState={startTimerAccordingToState}
            pauseTimerAccordingToState={pauseTimerAccordingToState}
            isStudyTimerPaused={isStudyTimerPaused}
            setShowResetSessionModal={setShowResetSessionModal}
            isShortBreakSessionInitialized={isShortBreakSessionInitialized}
            isLongBreakSessionInitialized={isLongBreakSessionInitialized}
            isShortBreakTimerPaused={isShortBreakTimerPaused}
            isLongBreakTimePaused={isLongBreakTimerPaused}
            resetShortBreakTime={resetShortBreakTime}
            resetLongBreakTime={resetLongBreakTime}
          />
        </div>
      </div>

      <StudySessionActivatedModal
        show={showStudySessionActivatedModal}
        setShow={setShowStudySessionActivatedModal}
      />
      <ShortBreakSessionActivatedModal
        show={showShortBreakSessionActivatedModal}
        setShow={setShowShortBreakSessionActivatedModal}
      />
      <LongBreakSessionActivatedModal
        show={showLongBreakSessionActivatedModal}
        setShow={setShowLongBreakSessionActivatedModal}
      />
      <EscapeSessionModal
        show={showEscapeSessionModal}
        setShow={setShowEscapeSessionModal}
      />
      <ResetSessionModal
        show={showResetSessionModal}
        setShow={setShowResetSessionModal}
        onResetCallback={resetSession}
      />
      <PauseStudySessionModal
        show={showPauseSessionModal}
        setShow={setShowPauseSessionModal}
      />
      <CongratulationsModal
        show={showCongratulationsModal}
        setShow={setShowCongratulationsModal}
      />
    </>
  );
};

export default SuperFocusTimer;
