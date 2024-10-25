"use client";

import HowToModal from "@/components/common/how-to-modal";
import Lottie from "lottie-react";
import { useState } from "react";
import Bulb from "../../../public/bulb.json";
import { howToModalGratitudeListObj } from "./constants";
import Header from "./header";
import MainContainer from "./main-container";

const GratitudeList = () => {
  const [showHowToModal, setShowHowToModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <Header />
      <MainContainer />
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
        {...howToModalGratitudeListObj}
      />
    </div>
  );
};

export default GratitudeList;
