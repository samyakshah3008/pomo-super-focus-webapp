"use client";

import Lottie from "lottie-react";
import PreparingFrameworkLottie from "../../../public/cooking-custom-framework.json";

const PreparingScreen = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[500px] h-[500px]">
        <Lottie
          animationData={PreparingFrameworkLottie}
          loop={true}
          width={500}
          height={500}
        />
      </div>
      <div className="text-2xl font-bold text-center">
        Your framework is getting cooked! Please wait for a while...!
      </div>
    </div>
  );
};

export default PreparingScreen;
