"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { format } from "date-fns";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GemBox from "../../../public/skull-reward.json";

type Word = {
  text: string;
  className?: string;
};

const Onboarding = ({ setIsOnboardingCompleted }: any) => {
  const today = format(new Date(), "yyyy-MM-dd");

  const currentUser = useSelector((state: any) => state?.user);
  const [words, setWords] = useState<Word[]>([]);
  const [birthDate, setBirthDate] = useState<any>();
  const [lifeSpan, setLifeSpan] = useState();

  const completeOnboardingHandler = () => {
    setIsOnboardingCompleted(true);
  };

  useEffect(() => {
    if (!currentUser?.pomoSuperUser) return;
    setWords([
      {
        text: "Track",
      },
      {
        text: `your`,
      },
      {
        text: `precious`,
      },
      {
        text: `time,`,
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
      <div className="w-80 h-80 flex m-auto">
        <Lottie animationData={GemBox} loop={true} width={250} />
      </div>
      <TypewriterEffectSmooth words={words} />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Life moves very fast, set your personalized life span eg. 50years and
        see visual progress of how much span is left as per your age to get
        awared! 👀
      </p>
      <div className="flex flex-col gap-5 w-[600px] ">
        <div className="flex mt-10 gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <div className="font-bold">Enter your birth date:</div>{" "}
            <Input
              max={today}
              type="date"
              value={birthDate}
              onChange={(e: any) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-[50%] ">
            <div className="font-bold">Decide your own estimate life span:</div>{" "}
            <Input
              type="number"
              value={lifeSpan}
              onChange={(e: any) => setLifeSpan(e.target.value)}
              placeholder="60"
            />{" "}
          </div>
        </div>
        <Button
          onClick={completeOnboardingHandler}
          disabled={!birthDate || !lifeSpan}
        >
          Take me to precious time tracker!
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
