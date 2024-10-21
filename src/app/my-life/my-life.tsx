"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./header";
import { calculateLifeLeft } from "./helper";
import Onboarding from "./onboarding";
import TimeLeftGrid from "./time-left-grid";
import YearsGrid from "./years-grid";

const MyLife = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [lifeLeftObj, setLifeLeftObj] = useState<any>(null);
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
    </div>
  );
};

export default MyLife;
