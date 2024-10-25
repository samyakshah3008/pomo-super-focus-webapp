"use client";

import HowToModal from "@/components/common/how-to-modal";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bulb from "../../../public/bulb.json";
import { howToModalMyLifeObj } from "./constant";
import Header from "./header";
import { calculateLifeLeft } from "./helper";
import Onboarding from "./onboarding";
import TimeLeftGrid from "./time-left-grid";
import YearsGrid from "./years-grid";

const MyLife = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(true);
  const [lifeLeftObj, setLifeLeftObj] = useState<any>(null);
  const [showHowToModal, setShowHowToModal] = useState(false);

  const currentUser = useSelector((state: any) => state?.user);

  useEffect(() => {
    if (!currentUser?.pomoSuperUser) return;
    const timeLeft = calculateLifeLeft("30-08-2003", 60);
    setLifeLeftObj(timeLeft);
  }, [currentUser]);

  if (!currentUser?.pomoSuperUser) {
    return null;
  }

  if (!isOnboardingCompleted) {
    return <Onboarding setIsOnboardingCompleted={setIsOnboardingCompleted} />;
  }
  return (
    <div className="flex flex-col gap-4 pl-10 pr-10 pb-5 w-[85%] m-auto ">
      <Header lifeLeftObj={lifeLeftObj} />
      <TimeLeftGrid lifeLeftObj={lifeLeftObj} />
      <YearsGrid lifeLeftObj={lifeLeftObj} />

      <div className="absolute top-10 right-40">
        {" "}
        <Lottie
          onClick={() => setShowHowToModal(true)}
          className="cursor-pointer w-24 h-24"
          animationData={Bulb}
          loop={true}
        />
      </div>
      <HowToModal
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
        showExplodingHeart={false}
        {...howToModalMyLifeObj}
      />
    </div>
  );
};

export default MyLife;
