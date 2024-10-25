"use client";

import Lottie from "lottie-react";
import HeartExploding from "../../../public/exploding-heart.json";

const ExplodingHeartConfetti = () => {
  return (
    <div className="w-[1000px] h-[600px] max-h-[600px] absolute top-0">
      <Lottie
        className="w-[1000px] h-[600px]"
        animationData={HeartExploding}
        loop={false}
      />
    </div>
  );
};

export default ExplodingHeartConfetti;
