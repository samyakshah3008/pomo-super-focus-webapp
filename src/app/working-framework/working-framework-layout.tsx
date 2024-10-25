"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import { DotBackground } from "@/components/common/grid-and-dot-background";
import HowToModal from "@/components/common/how-to-modal";
import { Separator } from "@/components/ui/primitives/separator";
import Lottie from "lottie-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bulb from "../../../public/bulb.json";
import ActivatedFramework from "./activated-framework";
import { howToModalWorkingFrameworkObj } from "./constants";
import CustomTemplate from "./custom-template";
import Header from "./header";
import StarterTemplates from "./starter-templates";
import SuccessModal from "./success-modal";

const WorkingFrameworkLayout = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customFrameworkName, setCustomFrameworkName] = useState<any>("");
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  useEffect(() => {
    if (!showHowToModal) return;
    if (showHowToModal) {
      setShowExplodingHeart(false);
    }
  }, [showHowToModal]);

  useEffect(() => {
    const fromFlow = searchParams.get("from");
    const frameworkName = searchParams.get("frameworkName");
    if (fromFlow == "create-flow") {
      setShowSuccessModal(true);
      setCustomFrameworkName(frameworkName);
    } else {
      setShowSuccessModal(false);
    }
  }, []);

  useEffect(() => {
    if (!showSuccessModal) {
      router.push("/working-framework");
    }
  }, [showSuccessModal]);

  if (!currentUser?._id) {
    return null;
  }

  const sections = [
    <Header />,
    <ActivatedFramework framework={currentUser?.workingFramework} />,
    <StarterTemplates />,
    <CustomTemplate />,
  ];

  return (
    <>
      <DotBackground widthFull={true}>
        {showExplodingHeart ? <ExplodingHeartConfetti /> : null}

        <div className="flex flex-col w-[80%] gap-10 ">
          {sections.map((section: any, id: any) => {
            return (
              <React.Fragment key={id}>
                {section}
                {sections?.length !== id ? <Separator /> : null}
              </React.Fragment>
            );
          })}
        </div>
      </DotBackground>
      <div className="fixed top-10 right-40">
        {" "}
        <Lottie
          onClick={() => setShowHowToModal(true)}
          className="cursor-pointer w-24 h-24"
          animationData={Bulb}
          loop={true}
        />
      </div>
      <SuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
        customFrameworkName={customFrameworkName}
      />
      <HowToModal
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
        setShowExplodingHeart={setShowExplodingHeart}
        {...howToModalWorkingFrameworkObj}
      />
    </>
  );
};

export default WorkingFrameworkLayout;
