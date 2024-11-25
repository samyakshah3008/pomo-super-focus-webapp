"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import HowToModal from "@/components/common/how-to-modal";
import { IconBulbFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { howToModalHabitsObj } from "../constants";
import Header from "./header";
import MainContainer from "./main-container";

const Dashboard = () => {
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

  useEffect(() => {
    if (!showHowToModal) return;
    if (showHowToModal) {
      setShowExplodingHeart(false);
    }
  }, [showHowToModal]);

  useEffect(() => {
    if (!showExplodingHeart) return;
    let id = setTimeout(() => {
      setShowExplodingHeart(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [showExplodingHeart]);

  return (
    <div className="flex flex-col gap-4 items-center pb-5">
      {showExplodingHeart ? <ExplodingHeartConfetti /> : null}

      <Header />
      <MainContainer />

      <div className="absolute top-20 lg:top-10 right-7 lg:right-40">
        <IconBulbFilled
          onClick={() => setShowHowToModal(true)}
          className="cursor-pointer text-yellow-400 w-10 h-10 sm:w-16 lg:h-16"
        />
      </div>

      <HowToModal
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
        setShowExplodingHeart={setShowExplodingHeart}
        {...howToModalHabitsObj}
      />
    </div>
  );
};

export default Dashboard;
