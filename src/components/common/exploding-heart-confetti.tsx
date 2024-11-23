"use client";

import Lottie from "lottie-react";
import HeartExploding from "../../../public/exploding-heart.json";

const ExplodingHeartConfetti = () => {
  return (
    <div className="absolute top-0">
      <Lottie
        className="w-[600px] xl:w-[1000px] lg:w-[800px] h-[600px]"
        animationData={HeartExploding}
        loop={false}
      />
    </div>
  );
};

export default ExplodingHeartConfetti;
