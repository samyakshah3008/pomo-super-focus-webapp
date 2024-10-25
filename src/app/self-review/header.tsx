"use client";

import Lottie from "lottie-react";
import Rank1 from "../../../public/rank-one.json";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-64 m-auto">
        <div className="w-[250px]">
          <Lottie animationData={Rank1} loop={true} width={250} />
        </div>
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-center">
        In the end, it's only
        <span className="text-blue-500"> You v/s You!</span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 w-[800px]">
        The journey to success is a personal battle—it's always been you against
        yourself. Challenge your limits, push your boundaries, and track your
        progress as you strive to become the best version of yourself. Remember,
        the only competition that matters is the one within.
      </p>
    </div>
  );
};

export default Header;
