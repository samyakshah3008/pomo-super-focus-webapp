"use client";

import { getCurrentYear, getDaysUntilYearEnd } from "@/utils/helper-functions";
import Image from "next/image";
import WitchyLeaders from "../../../public/witch-leaders.png";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 mb-10">
        <Image
          width={300}
          height={300}
          src={WitchyLeaders}
          alt="witchy-leaders"
        />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold">
        Meet our <span className="text-blue-500">PomoSuperLeaders!</span>{" "}
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 ">
        Let’s take a moment to appreciate the hard work of our PomoSuperLeaders
        who continue to push their limits. Check your rank, and use it as
        motivation to climb even higher and make the most of the remaining{" "}
        {getDaysUntilYearEnd()} days of {getCurrentYear()}!
      </p>
      <div className="p-2 border-yellow-500 bg-yellow-200 border-solid border-2 mt-4 rounded-lg">
        This Feature is under construction, we will soon update you when we
        launch this. Meanwhile appreciate your patience!{" "}
      </div>
    </div>
  );
};

export default Header;
