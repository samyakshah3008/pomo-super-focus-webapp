"use client";

import Lottie from "lottie-react";
import Gratitude from "../../../public/gratitude.json";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-64 m-auto">
        <Lottie animationData={Gratitude} loop={true} />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold">
        Review your
        <span className="text-blue-500"> Gratitude List</span> as Life moves
        fast!
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
        For all the things which you have currently, someone is manifesting it
        to have them, be grateful for what you have. List down all your
        gratitudes as life moves fast.
      </p>
    </div>
  );
};

export default Header;
