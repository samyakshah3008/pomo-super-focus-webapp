"use client";

import HowToModal from "@/components/common/how-to-modal";
import { useToast } from "@/components/ui/primitives/use-toast";
import { IconBulbFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { howToModalMyLifeObj } from "./constant";
import Header from "./header";
import { calculateLifeLeft } from "./helper";
import Onboarding from "./onboarding";
import TimeLeftGrid from "./time-left-grid";
import YearsGrid from "./years-grid";

const MyLife = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [lifeLeftObj, setLifeLeftObj] = useState<any>(null);
  const [showHowToModal, setShowHowToModal] = useState(false);

  const currentUser = useSelector((state: any) => state?.user);

  const { toast } = useToast();

  const showSuccessOnboarding = () => {
    toast({
      variant: "default",
      title: "Welcome onboard!",
      description: "We are pleased to have you here!",
    });
  };

  useEffect(() => {
    if (!currentUser?.pomoSuperUser?._id) return;
    if (currentUser?.pomoSuperUser?.isMyLifeOnboardingComplete) {
      const { birthDate, estimateLifeSpan } = currentUser?.pomoSuperUser;
      setIsOnboardingCompleted(true);
      const timeLeft = calculateLifeLeft(birthDate, estimateLifeSpan);
      setLifeLeftObj(timeLeft);
    } else {
      setIsOnboardingCompleted(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (
      !currentUser?.pomoSuperUser?._id ||
      !currentUser.pomoSuperUser.isMyLifeOnboardingComplete
    )
      return;

    const { birthDate, estimateLifeSpan } = currentUser.pomoSuperUser;

    const id = setInterval(() => {
      const timeLeft = calculateLifeLeft(birthDate, estimateLifeSpan);
      if (timeLeft) {
        setLifeLeftObj(timeLeft);
        if (timeLeft.isLifeSpanCompleted) {
          clearInterval(id);
        }
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [currentUser]);

  if (!currentUser?.pomoSuperUser) {
    return null;
  }

  if (!isOnboardingCompleted) {
    return (
      <Onboarding
        showSuccessOnboarding={showSuccessOnboarding}
        setIsOnboardingCompleted={setIsOnboardingCompleted}
      />
    );
  }
  return (
    <div className="flex flex-col gap-4 pl-10 pr-10 pb-5 w-[85%] m-auto ">
      <Header lifeLeftObj={lifeLeftObj} />
      <TimeLeftGrid lifeLeftObj={lifeLeftObj} />
      <YearsGrid lifeLeftObj={lifeLeftObj} />

      <div className="absolute top-10 right-40">
        <IconBulbFilled
          onClick={() => setShowHowToModal(true)}
          className="cursor-pointer text-yellow-400 w-20 h-20"
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
