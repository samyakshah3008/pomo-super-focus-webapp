"use client";

import PropTypes from "prop-types";
import { useEffect } from "react";

const Timer = ({
  time,
  setTime,
  onTimerEnd,
  showHours,
  showMinutes,
  showSeconds,
}: any) => {
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime: any) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          onTimerEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [onTimerEnd]);

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    let timeString = "";
    if (showHours) timeString += `${formattedHours}h:`;
    if (showMinutes) timeString += `${formattedMinutes}m:`;
    if (showSeconds) timeString += `${formattedSeconds}s`;

    return timeString.endsWith(":") ? timeString.slice(0, -1) : timeString;
  };

  if (time <= 0) return;
  return <span className="text-blue-500 text-sm">{formatTime(time)}</span>;
};

Timer.propTypes = {
  onTimerEnd: PropTypes.func.isRequired,
  showHours: PropTypes.bool,
  showMinutes: PropTypes.bool,
  showSeconds: PropTypes.bool,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default Timer;
