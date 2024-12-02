"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import Underconstruction from "../../public/witch-dashboard.json";

const MainContainer = () => {
  return (
    <div className="w-[80%] m-auto h-full flex flex-col items-center gap-5 justify-center">
      <div className="w-96 h-96">
        <Lottie animationData={Underconstruction} loop={true} />
      </div>
      <div className="text-2xl font-bold text-center">
        Knock knock! You mistakenly entered to witch's house! You are not
        allowed to stay here;)
      </div>
      <Link
        href="/dashboard"
        className="underline cursor-pointer text-blue-500 font-bold"
      >
        Fly back to Dashboard with Witch!
      </Link>
      <div className="p-2 border-yellow-500 bg-yellow-200 border-solid border-2 mt-4 rounded-lg">
        Please note that the page you are looking for doesn't exists, if you
        feel this is an issue, please report to us -{" "}
        <Link className="text-red-500 font-bold" href="/report-bug">
          Here
        </Link>
      </div>
    </div>
  );
};

export default MainContainer;
