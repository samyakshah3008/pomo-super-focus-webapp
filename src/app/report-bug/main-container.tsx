"use client";

import Lottie from "lottie-react";
import { useState } from "react";
import GreenCheck from "../../../public/checkmark-success.json";
import Header from "./header";
import ReportBugForm from "./report-bug-form";

export default function MainContainer() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formResponse, setFormResponse] = useState(null);

  return (
    <div className="flex flex-col gap-4 items-center pb-5">
      {!isFormSubmitted ? (
        <>
          {" "}
          <Header />
          <ReportBugForm
            setIsFormSubmitted={setIsFormSubmitted}
            setFormResponse={setFormResponse}
          />
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[300px]">
            <Lottie
              animationData={GreenCheck}
              loop={true}
              width={300}
              height={300}
            />
          </div>
          <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-center">
            <span className="text-blue-500">Github Ticket </span>
            Created!
          </div>
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 w-[800px]">
            We have successfully reported your issue by creating a github ticket
            and our engineering team will soon fix it! You can find your ticket
            -
            <a
              className="text-blue-500 font-semibold underline"
              href={formResponse!}
              target="_blank"
            >
              here
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
