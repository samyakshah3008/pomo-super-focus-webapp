"use client";

import { useState } from "react";

import { AccordionBlocks } from "@/components/common/accordion-blocks";
import { ProgressBar } from "@/components/common/progress";
import Lottie from "lottie-react";
import DashboardChecklist from "../../../public/checklist-dashboard.json";
import { checklistAccordionItems } from "./constants";

const Checklist = () => {
  const [progress, setProgress] = useState(13);

  return (
    <div className="flex flex-col gap-5 align-center justify-center">
      <div className="text-2xl font-bold text-center">
        Getting Started with PomoSuperFocus!
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="w-[250px]">
          <Lottie animationData={DashboardChecklist} loop={true} width={250} />
        </div>
        <div className="flex flex-col gap-4">
          <ProgressBar progress={progress} setProgress={setProgress} />
          <AccordionBlocks accordionItems={checklistAccordionItems} />
        </div>
      </div>
    </div>
  );
};

export default Checklist;
