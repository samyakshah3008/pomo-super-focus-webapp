"use client";

import { TimelineDemo } from "@/components/(self-review)/timeline";

const MainContainer = () => {
  return (
    <div className="flex flex-col gap-4 w-[70%] m-auto ">
      <div className="max-h-full">
        {" "}
        <TimelineDemo />
      </div>
    </div>
  );
};

export default MainContainer;
