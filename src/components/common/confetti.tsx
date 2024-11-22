"use client";

import Lottie from "lottie-react";
import ConfettiLottie from "../../../public/confetti.json";

const Confetti = () => {
  return (
    <div className="w-[800px] absolute">
      <Lottie animationData={ConfettiLottie} loop={false} />
    </div>
  );
};

export default Confetti;
