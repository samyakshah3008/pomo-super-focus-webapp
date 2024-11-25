"use client";

import Lottie from "lottie-react";
import PreparingFrameworkLottie from "../../../public/cooking-custom-framework.json";

const PreparingScreen = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[250px] h-[250px] lg:w-[500px] lg:h-[500px]">
        <Lottie animationData={PreparingFrameworkLottie} loop={true} />
      </div>
      <div className="text-2xl font-bold text-center">
        Your framework is getting cooked! Please wait for a while...!
      </div>
    </div>
  );
};

export default PreparingScreen;
