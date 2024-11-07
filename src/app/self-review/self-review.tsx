"use client";

import HowToModal from "@/components/common/how-to-modal";
import { IconBulbFilled } from "@tabler/icons-react";
import { useState } from "react";
import { howToModalSelfReviewListObj } from "./constants";
import Header from "./header";
import MainContainer from "./main-container";

const SelfReview = () => {
  const [showHowToModal, setShowHowToModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center p-4">
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
        showExplodingHeart={false}
        {...howToModalSelfReviewListObj}
      />
    </div>
  );
};

export default SelfReview;
