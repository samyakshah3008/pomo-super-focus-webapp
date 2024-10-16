"use client";

import Lottie from "lottie-react";
import DashboardProgressReview from "../../../public/progress-dashboard.json";
import DailyProgressWidget from "./(daily-progress)/daily-progress-widget";

const ProgressReview = () => {
  return (
    <div className="flex flex-col gap-5 align-center justify-center">
      <div className="text-2xl font-bold text-center">
        Quick look to your efforts!
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="w-[250px]">
          <Lottie
            animationData={DashboardProgressReview}
            loop={true}
            width={250}
          />
        </div>
        <DailyProgressWidget />
      </div>
    </div>
  );
};

export default ProgressReview;
