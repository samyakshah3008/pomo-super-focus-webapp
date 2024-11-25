"use client";

import Image from "next/image";
import SelfReview from "../../../public/self-review.png";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[300px] m-auto">
        <Image src={SelfReview} alt="eisen-hower" />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-center">
        In the end, it's only
        <span className="text-blue-500"> You v/s You!</span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
        Document your yearly ups and downs in chunks and take a time to self
        review of how far you have reached! Life moves very fast and sometimes
        we forget how far we have been to!
      </p>
    </div>
  );
};

export default Header;
