"use client";

import Lottie from "lottie-react";
import DashboardWitch from "../../../public/witch-dashboard.json";

import {
  getCurrentYear,
  getDaysUntilYearEnd,
  getTimeOfDay,
} from "@/utils/helper-functions";
import { Loader } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }, [currentUser?.pomoSuperUser]);

  if (!words?.length || isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
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
      {currentUser?.pomoSuperUser?.isGuestUser ? (
        <div className="underline text-red-500 font-bold text-center mt-5 lg:w-[800px] text-xs lg:text-sm">
          Please note that since you are a guest user, we are not storing your
          data except account details. All the features will have default
          guest's data which you can check. Though you can check the creation
          flow for each! We appreciate your patience while we gradually give
          verified account access to our users!
        </div>
      ) : null}
    </div>
  );
};

export default Header;
