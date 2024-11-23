"use client";

import { useSuperFocus } from "@/context/super-focus";
import { cn } from "@/lib/utils";
import Image from "next/image";
import OngoingStateIcon from "../../../public/ongoing.svg";
import PauseStateIcon from "../../../public/pause.svg";
import ResetIcon from "../../../public/reset.svg";

interface TimerWidgetProps {
  isStudyTimeInitialized: boolean;
  getTextAccordingToState: () => string;
  startTimerAccordingToState: any;
  pauseTimerAccordingToState: any;
  isStudyTimerPaused: boolean;
  setShowResetSessionModal: (value: boolean) => void;
  isShortBreakSessionInitialized: boolean;
  isLongBreakSessionInitialized: boolean;
  isShortBreakTimerPaused: boolean;
  isLongBreakTimePaused: boolean;
  resetShortBreakTime: any;
  resetLongBreakTime: any;
}

const TimerWidget = ({
  isStudyTimeInitialized,
  getTextAccordingToState,
  startTimerAccordingToState,
  pauseTimerAccordingToState,
  isStudyTimerPaused,
  setShowResetSessionModal,
  isShortBreakSessionInitialized,
  isLongBreakSessionInitialized,
  isLongBreakTimePaused,
  isShortBreakTimerPaused,
  resetShortBreakTime,
  resetLongBreakTime,
}: TimerWidgetProps) => {
  const { activeState } = useSuperFocus();

  const bgColorMap: any = {
    study: "bg-blue-400",
    shortBreak: "bg-yellow-400",
    longBreak: "bg-green-400",
  };

  const isInitializedMap: any = {
    study: isStudyTimeInitialized,
    shortBreak: isShortBreakSessionInitialized,
    longBreak: isLongBreakSessionInitialized,
  };

  const isPausedMap: any = {
    study: isStudyTimerPaused,
    shortBreak: isShortBreakTimerPaused,
    longBreak: isLongBreakTimePaused,
  };

  const resetActions: any = {
    study: () => setShowResetSessionModal(true),
    shortBreak: resetShortBreakTime,
    longBreak: resetLongBreakTime,
  };

  const handleActionClick = () =>
    getTextAccordingToState() === "Resume" ||
    getTextAccordingToState() === "Start"
      ? startTimerAccordingToState
      : pauseTimerAccordingToState;

  const renderButton = (isPaused: boolean) => (
    <div
      onClick={handleActionClick()}
      className={cn(
        `rounded-full flex justify-center pt-2 pb-2 flex-1 ${bgColorMap[activeState]} cursor-pointer`
      )}
    >
      <Image
        src={isPaused ? PauseStateIcon : OngoingStateIcon}
        alt="state-icon"
      />
    </div>
  );

  const renderResetButton = () => (
    <div
      onClick={resetActions[activeState]}
      className={cn(
        `rounded-full flex justify-center text-center pt-2 pb-2 flex-1 ${bgColorMap[activeState]} cursor-pointer`
      )}
    >
      <Image src={ResetIcon} alt="reset-icon" />
    </div>
  );

  if (!activeState) return null;

  if (!isInitializedMap[activeState]) {
    return (
      <div
        onClick={handleActionClick()}
        className={cn(
          `rounded-full flex justify-center text-center pt-2 pb-2 flex-1 ${bgColorMap[activeState]} cursor-pointer`
        )}
      >
        <Image src={PauseStateIcon} alt="state-icon" />
      </div>
    );
  }

  return (
    <>
      {renderButton(isPausedMap[activeState])}
      {renderResetButton()}
    </>
  );
};

export default TimerWidget;
