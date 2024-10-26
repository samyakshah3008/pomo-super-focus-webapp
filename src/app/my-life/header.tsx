"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeartPulse from "../../../public/heart-pulse.json";

type Word = {
  text: string;
  className?: string;
};

const Header = ({ lifeLeftObj }: any) => {
  const currentUser = useSelector((state: any) => state?.user);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    if (!currentUser?.pomoSuperUser || !lifeLeftObj?.totalWeeksLeft) return;
    setWords([
      {
        text: `${currentUser?.pomoSuperUser?.firstName},`,
        className: "text-blue-500 dark:text-blue-500",
      },
      {
        text: "You",
      },
      {
        text: `have`,
      },
      {
        text: `only`,
      },
      {
        text: `${lifeLeftObj?.totalWeeksLeft} weeks`,
      },
      {
        text: `left. ⌛`,
      },
    ]);
  }, [currentUser?.pomoSuperUser, lifeLeftObj]);

  if (!currentUser?.pomoSuperUser || !words?.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex m-auto">
        <Lottie
          className="w-48 lg:w-52 xl:w-64"
          animationData={HeartPulse}
          loop={true}
        />
      </div>
      <TypewriterEffectSmooth words={words} />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center">
        Your life is too precious, don't waste a single second towards
        meaningless things. 👀
      </p>
    </div>
  );
};

export default Header;
