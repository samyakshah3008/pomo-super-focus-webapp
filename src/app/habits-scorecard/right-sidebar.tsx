"use client";

import { DotBackground } from "@/components/common/grid-and-dot-background";
import { usePathname } from "next/navigation";
import { CalendarDemo } from "./dashboard/calendar";
import Statistics from "./dashboard/statistics";

const RightSidebar = () => {
  const pathname = usePathname();

  if (pathname === "/habits-scorecard/dashboard") {
    return (
      <DotBackground widthFull={false}>
        <div className="flex flex-col mt-24 gap-10 p-5 justify-around w-fit">
          <CalendarDemo />
          <Statistics />
        </div>
      </DotBackground>
    );
  }
  return null;
};

export default RightSidebar;
