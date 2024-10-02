"use client";

import { useEffect, useState } from "react";

import { AccordionBlocks } from "@/components/common/accordion-blocks";
import { ProgressBar } from "@/components/common/progress";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import DashboardChecklist from "../../../public/checklist-dashboard.json";

const Checklist = () => {
  const [progress, setProgress] = useState(50);
  const currentUser = useSelector((state: any) => state?.user);

  useEffect(() => {
    if (!currentUser?.pomoSuperUser) return;
  }, [currentUser]);

  if (!currentUser?.pomoSuperUser) {
    return null;
  }
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
          <ProgressBar
            progress={progress}
            setProgress={setProgress}
            fetchedChecklistCompletedCount={
              currentUser?.pomoSuperUser?.checklistCompleteCount
            }
            totalCount={currentUser?.pomoSuperUser?.checklists?.length}
          />
          <AccordionBlocks
            accordionItems={currentUser?.pomoSuperUser?.checklists}
          />
        </div>
      </div>
    </div>
  );
};

export default Checklist;
