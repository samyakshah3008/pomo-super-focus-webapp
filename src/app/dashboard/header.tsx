"use client";
import Lottie from "lottie-react";
import DashboardWitch from "../../../public/witch-dashboard.json";

import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";

const Header = () => {
  const words = [
    {
      text: "Good",
    },
    {
      text: "Morning,",
    },
    {
      text: "Samyak Shah!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-[300px] h-[300px]">
        <Lottie
          animationData={DashboardWitch}
          loop={true}
          width={200}
          height={200}
        />
      </div>
      <TypewriterEffectSmooth words={words} />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Each new fresh day is an opportunity, you have 99 fresh opportunities
        till 2024 ends. Make the best out of it! 👀
      </p>
    </div>
  );
};

export default Header;
