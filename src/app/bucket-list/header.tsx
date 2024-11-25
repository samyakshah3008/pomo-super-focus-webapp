"use client";

import Lottie from "lottie-react";
import NightWitch from "../../../public/witch-3.json";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-64 m-auto">
        <Lottie animationData={NightWitch} loop={true} />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold">
        Time to check off your{" "}
        <span className="text-blue-500">Bucket List</span> one at a time!
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
        Turning dreams into reality, one step at a time—whether in life or
        career.
      </p>
    </div>
  );
};

export default Header;
