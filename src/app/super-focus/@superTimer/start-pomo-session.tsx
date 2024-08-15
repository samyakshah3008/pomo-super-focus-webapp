"use client";

import { Button } from "@/components/ui/primitives/button";
import { userIdKeyBrowserStorage } from "@/constants/browser-storage";
import { getLocalStorageItem } from "@/lib/browser-storage";
import { fetchActivePomodoroSession } from "@/lib/store/features/active-pomodoro-session/activePomodoroSessionSlice";
import { initiateActivePomodoroSessionService } from "@/services/pomodoros/pomodoro";
import { convertMinutesToSeconds } from "@/utils/super-timer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SelectSessionDrawer from "./select-session-drawer";

const StartPomoSession = () => {
  const [focusTimeInputValue, setFocusTimeInputValue] = useState(25);
  const [isSelectSessionDrawerOpen, setIsSelectSessionDrawerOpen] =
    useState(false);

  const userId = getLocalStorageItem(userIdKeyBrowserStorage);
  const dispatch = useDispatch();

  const onSelectSession = () => {
    setIsSelectSessionDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setIsSelectSessionDrawerOpen(false);
  };

  const onStartFocus = async () => {
    let focusTimeInSeconds = convertMinutesToSeconds(focusTimeInputValue);

    try {
      const payload = {
        userId,
        focusTimeInSeconds,
      };
      await initiateActivePomodoroSessionService(payload);
      dispatch(fetchActivePomodoroSession());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-base font-bold">Get ready to focus:)</div>
      <div className="text-sm text-muted-foreground text-center">
        For longer sessions, we'll add a short breaks so you can recharge.
        However we recommend you to start with small chunk of sessions and
        increase it gradually as your mental model trains itself. Laser focus
        for small session is better than Shallow focus for longer session.
      </div>
      <Button onClick={onSelectSession}>Select Session</Button>
      <SelectSessionDrawer
        isSelectSessionDrawerOpen={isSelectSessionDrawerOpen}
        onCloseDrawer={onCloseDrawer}
        focusTimeInputValue={focusTimeInputValue}
        setFocusTimeInputValue={setFocusTimeInputValue}
        onStartFocus={onStartFocus}
      />
    </>
  );
};

export default StartPomoSession;
