"use client";

import { useState } from "react";

import GreetingModal from "@/components/(dashboard)/greeting-modal";
import Confetti from "@/components/common/confetti";
import { DotBackground } from "@/components/common/grid-and-dot-background";
import { Separator } from "@/components/ui/primitives/separator";
import Checklist from "./checklist";
import Header from "./header";
import ProgressReview from "./progress-review";
import QuickStart from "./quick-start";

const DashboardLayout = () => {
  const sections = [
    <Header />,
    <Checklist />,
    <QuickStart />,
    <ProgressReview />,
  ];

  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div>
      <GreetingModal setShowConfetti={setShowConfetti} />
      <DotBackground widthFull={true}>
        {showConfetti ? <Confetti /> : null}
        <div className="flex flex-col w-[80%] gap-10 ">
          {sections.map((section, id) => {
            return (
              <>
                {section}
                {sections?.length !== id ? <Separator /> : null}
              </>
            );
          })}
        </div>
      </DotBackground>
    </div>
  );
};

export default DashboardLayout;
