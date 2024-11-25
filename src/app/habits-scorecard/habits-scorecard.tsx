"use client";

import { Separator } from "@/components/ui/primitives/separator";
import Header from "./header";

const HabitsScorecard = () => {
  const sections = [<Header />];
  return (
    <div className="flex flex-col gap-4 items-center pb-5">
      <div className="flex flex-col w-[80%] gap-10 ">
        {sections.map((section: any, id: any) => {
          return (
            <>
              {section}
              {sections?.length !== id + 1 ? <Separator /> : null}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HabitsScorecard;
