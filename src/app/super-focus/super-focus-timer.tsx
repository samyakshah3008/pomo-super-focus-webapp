"use client";

import {
  getBorderClass,
  getColorClass,
} from "@/components/(super-focus)/helper";
import { useSuperFocus } from "@/context/super-focus";
import { cn } from "@/lib/utils";
import { IconPlayerSkipBack, IconPlayerSkipForward } from "@tabler/icons-react";

const SuperFocusTimer = () => {
  const { getColor, setActiveState, activeState } = useSuperFocus();
  let themeColor = getColor();
  const colorClass = getColorClass(themeColor);
  const borderClass = getBorderClass(themeColor);

  const checkIsActive = (sessionType: any): boolean => {
    if (sessionType == activeState) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={cn(
        `w-full flex flex-col gap-5 bg-[#181c25cc] text-white border-2 ${borderClass} border-solid items-center rounded-3xl`
      )}
    >
      <div>
        <h1 className="text-[120px] text-center ">50:00</h1>
        <div className="flex gap-4 justify-center items-center">
          <IconPlayerSkipBack size={24} className="cursor-pointer" />
          <button
            className={cn(
              `border-2 font-bold bg-transparent ${borderClass} pl-8 pr-8 pt-4 pb-4 rounded-md uppercase`
            )}
          >
            Start
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
          onClick={() => setActiveState("study")}
        >
          Study
        </div>
        <div
          className={cn(
            `pt-4 pb-4 pr-10 pl-10 ${borderClass} border-2 border-solid cursor-pointer ${
              checkIsActive("shortBreak") && "underline"
            }`
          )}
          onClick={() => setActiveState("shortBreak")}
        >
          Short break
        </div>
        <div
          className={cn(
            `pt-4 pb-4 pr-10 pl-10 ${borderClass} border-2 border-solid border-l-0 cursor-pointer rounded-tr-md rounded-br-md ${
              checkIsActive("longBreak") && "underline"
            }`
          )}
          onClick={() => setActiveState("longBreak")}
        >
          Long break
        </div>
      </div>
    </div>
  );
};

export default SuperFocusTimer;
