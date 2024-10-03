"use client";

import Lottie from "lottie-react";
import DashboardWitch from "../../../public/witch-dashboard.json";

import {
  getCurrentYear,
  getDaysUntilYearEnd,
  getTimeOfDay,
} from "@/utils/helper-functions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";

type Word = {
  text: string;
  className?: string;
};

const Header = () => {
  const currentUser = useSelector((state: any) => state?.user);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    if (!currentUser?.pomoSuperUser) return;
    setWords([
      {
        text: "Witchy",
      },
      {
        text: `${getTimeOfDay()},`,
      },
      {
        text: `${currentUser?.pomoSuperUser?.firstName}!`,
        className: "text-blue-500 dark:text-blue-500",
      },
    ]);
  }, [currentUser?.pomoSuperUser]);

  if (!currentUser?.pomoSuperUser || !words?.length) {
    return null;
  }

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
        Each new fresh day is an opportunity, you have {getDaysUntilYearEnd()}{" "}
        fresh opportunities till {getCurrentYear()} ends. Make the best out of
        it! 👀
      </p>
    </div>
  );
};

export default Header;
