"use client";

import { useEffect, useState } from "react";

import GreetingModal from "@/components/(dashboard)/greeting-modal";
import Confetti from "@/components/common/confetti";
import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import { DotBackground } from "@/components/common/grid-and-dot-background";
import HowToModal from "@/components/common/how-to-modal";
import { Separator } from "@/components/ui/primitives/separator";
import Lottie from "lottie-react";
import Bulb from "../../../public/bulb.json";
import Checklist from "./checklist";
import { howToModalDashboardObj } from "./constants";
import Header from "./header";
import ProgressReview from "./progress-review";
import QuickStart from "./quick-start";

const DashboardLayout = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

  const sections = [
    <Header />,
    <Checklist />,
    <QuickStart />,
    <ProgressReview />,
  ];

  useEffect(() => {
    if (!showHowToModal) return;
    if (showHowToModal) {
      setShowExplodingHeart(false);
    }
  }, [showHowToModal]);

  return (
    <div>
      <GreetingModal setShowConfetti={setShowConfetti} />
      <DotBackground widthFull={true}>
        {showConfetti ? <Confetti /> : null}
        {showExplodingHeart ? <ExplodingHeartConfetti /> : null}
        <div className="flex flex-col w-[80%] gap-10 ">
          {sections.map((section, id) => {
            return (
              <>
                {section}
                {sections?.length !== id ? <Separator /> : null}
              </>
            );
          })}
        </div>
      </DotBackground>
      <div className="fixed top-10 right-40">
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
        setShowExplodingHeart={setShowExplodingHeart}
        {...howToModalDashboardObj}
      />
    </div>
  );
};

export default DashboardLayout;
