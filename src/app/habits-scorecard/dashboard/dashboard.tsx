"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import HowToModal from "@/components/common/how-to-modal";
import { IconBulbFilled } from "@tabler/icons-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { howToModalHabitsObj } from "../constants";
import Header from "./header";
import MainContainer from "./main-container";

const Dashboard = () => {
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

  const [isGuestUser, setIsGuestUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
    } else {
      setIsGuestUser(false);
    }
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center pb-5">
      {showExplodingHeart ? <ExplodingHeartConfetti /> : null}

      <Header />

      <div className="border-2 text-sm rounded-md border-green-500 border-solid p-2 bg-green-200 font-medium lg:w-[600px] text-center">
        {`Dear ${
          currentUser?.firstName || "Super User"
        }, this feature is open for everyone. Incase we face heavy traffic - due to our servers on limited free plan, you might face some issues. We appreciate your patience for the same! 💝`}
      </div>

      <MainContainer />

      <div className="absolute top-20 lg:top-10 right-7 lg:right-40">
        <IconBulbFilled
          onClick={() => setShowHowToModal(true)}
          className="cursor-pointer text-yellow-400 w-10 h-10 sm:w-16 lg:h-16"
        />
      </div>

      <HowToModal
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
        setShowExplodingHeart={setShowExplodingHeart}
        {...howToModalHabitsObj}
      />
    </div>
  );
};

export default Dashboard;
