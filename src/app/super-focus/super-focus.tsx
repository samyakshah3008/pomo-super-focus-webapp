"use client";

import { useState } from "react";
import DailyProgressWidget from "./@dailyProgress/daily-progress-widget";
import SuperTimerWidget from "./@superTimer/super-timer-widget";

const SuperFocus = () => {
  const [activeState, setActiveState] = useState("Pomodoro");
  const [startNewSession, setStartNewSession] = useState(false);

  const getClassNameBasedOnState = () => {
    if (activeState == "Pomodoro") {
      return "bg-gradient-to-r from-red-100 to-red-600";
    } else if (activeState == "Short break") {
      return "bg-gradient-to-r from-yellow-100 to-yellow-600";
    } else if (activeState == "Long break") {
      return "bg-gradient-to-r from-green-100 to-green-600";
    }
  };

  return (
    <div style={{ height: "100vh" }} className={getClassNameBasedOnState()}>
      <div>Navbar in construction</div>
      <SuperTimerWidget
        activeState={activeState}
        setActiveState={setActiveState}
        startNewSession={startNewSession}
        setStartNewSession={setStartNewSession}
      />
      <div>Tasks panel</div>

      <DailyProgressWidget />
    </div>
  );
};

export default SuperFocus;