"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import HowToModal from "@/components/common/how-to-modal";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Bulb from "../../../public/bulb.json";
import { howToModalGoalObj } from "./constants";
import Header from "./header";
import MainContainer from "./main-container";

const Goals = () => {
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

  useEffect(() => {
    if (!showHowToModal) return;
    if (showHowToModal) {
      setShowExplodingHeart(false);
    }
  }, [showHowToModal]);

  return (
    <div className="flex flex-col gap-4 items-center">
      {showExplodingHeart ? <ExplodingHeartConfetti /> : null}

      <Header />
      <MainContainer />

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
        {...howToModalGoalObj}
      />
    </div>
  );
};

export default Goals;
