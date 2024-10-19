"use client";

import Lottie from "lottie-react";
import Underconstruction from "../../../public/under-construction-man.json";

const Tasks = () => {
  return (
    <div className="w-[70%] m-auto flex flex-col items-center gap-5 justify-center">
      <div className="w-96 h-96">
        <Lottie animationData={Underconstruction} loop={true} />
      </div>
      <div className="text-2xl font-bold text-center">
        This feature is under construction, we will update you once we launch
        this. Meanwhile, we appreciate your patience:)
      </div>
    </div>
  );
};

export default Tasks;
