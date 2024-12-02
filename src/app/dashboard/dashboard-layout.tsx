"use client";

import { useEffect, useState } from "react";

import GreetingModal from "@/components/(dashboard)/greeting-modal";
import Confetti from "@/components/common/confetti";
import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import HowToModal from "@/components/common/how-to-modal";
import { Separator } from "@/components/ui/primitives/separator";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { IconBulbFilled } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import Checklist from "./checklist";
import { howToModalDashboardObj } from "./constants";
import Header from "./header";
import QuickStart from "./quick-start";

const DashboardLayout = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

  const dispatch = useDispatch();

  const sections = [<Header />, <Checklist />, <QuickStart />];

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
    if (!showConfetti) return;
    let id = setTimeout(() => {
      setShowConfetti(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [showConfetti]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center pb-5">
      <GreetingModal setShowConfetti={setShowConfetti} />
      {showConfetti ? <Confetti /> : null}
      {showExplodingHeart ? <ExplodingHeartConfetti /> : null}
      <div className="flex flex-col gap-10 p-4 ">
        {sections.map((section, id) => {
          return (
            <>
              {section}
              {id < sections.length - 1 ? <Separator /> : null}
            </>
          );
        })}
      </div>
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
        {...howToModalDashboardObj}
      />
    </div>
  );
};

export default DashboardLayout;
