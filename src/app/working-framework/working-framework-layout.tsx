"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import HowToModal from "@/components/common/how-to-modal";
import { Separator } from "@/components/ui/primitives/separator";
import { IconBulbFilled } from "@tabler/icons-react";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActivatedFramework from "./activated-framework";
import {
  guestUserActiveWorkingFramework,
  howToModalWorkingFrameworkObj,
} from "./constants";
import CustomTemplate from "./custom-template";
import Header from "./header";
import StarterTemplates from "./starter-templates";
import SuccessModal from "./success-modal";

const WorkingFrameworkLayout = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customFrameworkName, setCustomFrameworkName] = useState<any>("");
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestUser, setIsGuestUser] = useState(false);

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
    if (!showExplodingHeart) return;
    let id = setTimeout(() => {
      setShowExplodingHeart(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [showExplodingHeart]);

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

  useEffect(() => {
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
    } else {
      setIsGuestUser(false);
    }
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading || !currentUser?._id) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  const sections = [
    <Header isGuestUser={isGuestUser} currentUser={currentUser} />,
    <ActivatedFramework
      framework={
        isGuestUser
          ? guestUserActiveWorkingFramework
          : currentUser?.workingFramework
      }
    />,
    <StarterTemplates isGuestUser={isGuestUser} />,
    <CustomTemplate />,
  ];

  return (
    <div className="flex flex-col gap-4 items-center pb-5">
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
      <div className="absolute top-20 lg:top-10 right-7 lg:right-40">
        <IconBulbFilled
          onClick={() => setShowHowToModal(true)}
          className="cursor-pointer text-yellow-400 w-10 h-10 sm:w-16 lg:h-16"
        />
      </div>
      <SuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
        customFrameworkName={customFrameworkName}
        isGuestUser={isGuestUser}
      />
      <HowToModal
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
        setShowExplodingHeart={setShowExplodingHeart}
        {...howToModalWorkingFrameworkObj}
      />
    </div>
  );
};

export default WorkingFrameworkLayout;
