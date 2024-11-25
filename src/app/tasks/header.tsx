"use client";

import Image from "next/image";
import EisenHower from "../../../public/eisen-hower-matrix-2.png";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[250px] lg:w-[500px] m-auto">
        <Image src={EisenHower} alt="eisen-hower" />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold">
        Get your work done with
        <span className="text-blue-500"> Eisenhower Matrix! </span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
        The Eisenhower Matrix method used by US President Dwight D. Eisenhower
        is based on the task evaluation using the criteria important/unimportant
        and urgent/not urgent.
      </p>
    </div>
  );
};

export default Header;
