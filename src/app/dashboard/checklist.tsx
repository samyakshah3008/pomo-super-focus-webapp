"use client";

import { AccordionBlocks } from "@/components/common/accordion-blocks";
import { ProgressBar } from "@/components/common/progress";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardChecklist from "../../../public/checklist-dashboard.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Checklist = () => {
  const [progress, setProgress] = useState(50);
  const currentUser = useSelector((state: any) => state?.user);
  const [isLoading, setIsLoading] = useState(true);

  const getChecklistCount = () => {
    const count = currentUser?.pomoSuperUser?.checklists?.filter(
      (item: any) => item?.completed
    )?.length;
    return count;
  };

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  // If currentUser or data is still loading, render nothing to prevent hydration mismatch
  if (isLoading || !currentUser?.pomoSuperUser) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 align-center justify-center w-full">
      <div className="text-2xl font-bold text-center">
        Getting Started with PomoSuperFocus!
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="w-[250px]">
          <Lottie animationData={DashboardChecklist} loop={true} width={250} />
        </div>
        <div className="flex flex-col gap-4">
          <ProgressBar
            progress={progress}
            setProgress={setProgress}
            fetchedChecklistCompletedCount={getChecklistCount()}
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
