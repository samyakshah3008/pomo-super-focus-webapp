"use client";

import Image from "next/image";
import AtomicHabits from "../../../../public/james-clear-atomic-habits.webp";

const Header = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="w-[250px] lg:w-[400px] m-auto">
        <Image src={AtomicHabits} alt="eisen-hower" className="rounded-md" />
      </div>
      <div>
        <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-center">
          Get
          <span className="text-blue-500"> 1% Better</span> everyday!
        </div>
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
          Complaining about not achieving success despite working hard is like
          complaining about an ice cube not melting when you heated it from
          twenty-five to thirty-one degrees. Your work was not wasted; it is
          just being stored. All the action happens at thirty-two degrees.
        </p>
      </div>
    </div>
  );
};

export default Header;
