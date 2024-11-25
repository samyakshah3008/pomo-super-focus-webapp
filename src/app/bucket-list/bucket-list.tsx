"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import HowToModal from "@/components/common/how-to-modal";
import { IconBulbFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { howToModalBucketListObj } from "./constants";
import Header from "./header";
import MainContainer from "./main-container";

const BucketList = () => {
  const [showHowToModal, setShowHowToModal] = useState(false);

  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

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
    <div className="flex flex-col gap-4 items-center">
      {showExplodingHeart ? <ExplodingHeartConfetti /> : null}

      <Header />
      <MainContainer />
      <div className="absolute top-10 right-0 lg:right-40">
        <IconBulbFilled
          onClick={() => setShowHowToModal(true)}
          className="cursor-pointer text-yellow-400 w-10 h-10 sm:w-16 lg:h-16"
        />
      </div>
      <HowToModal
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
        showExplodingHeart={true}
        setShowExplodingHeart={setShowExplodingHeart}
        {...howToModalBucketListObj}
      />
    </div>
  );
};

export default BucketList;
