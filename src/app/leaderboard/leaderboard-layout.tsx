"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import { DotBackground } from "@/components/common/grid-and-dot-background";
import HowToModal from "@/components/common/how-to-modal";
import { Separator } from "@/components/ui/primitives/separator";
import { getLocalStorageItem } from "@/lib/browser-storage";
import {
  getUserRankOfTheWeekService,
  getWeeklyLeaderboardDetailsService,
} from "@/services/leaderboard/leaderboard";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Bulb from "../../../public/bulb.json";
import { howToModalLeaderboardObj } from "./constants";
import Header from "./header";
import TopTenList from "./top-ten-list";
import TopThree from "./top-three";
import UserRank from "./user-rank";

const LeaderboardLayout = () => {
  const [leaderboardList, setLeaderboardList] = useState([]);
  const [userRank, setUserRank] = useState<any>(null);
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showExplodingHeart, setShowExplodingHeart] = useState(false);

  const userId = getLocalStorageItem("pomoSuperUserId");

  const getWeeklyLeaderboardDetails = async () => {
    try {
      const response = await getWeeklyLeaderboardDetailsService();
      setLeaderboardList(response?.data?.data?.leaderboardList || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRankOfTheWeek = async () => {
    try {
      const response = await getUserRankOfTheWeekService(userId);
      setUserRank(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sections: any = [
    <Header />,
    <TopThree leaderboardList={leaderboardList} />,
    <TopTenList leaderboardList={leaderboardList} />,
    <UserRank userRank={userRank} />,
  ];

  useEffect(() => {
    getWeeklyLeaderboardDetails();
    getUserRankOfTheWeek();
  }, []);

  useEffect(() => {
    if (!showHowToModal) return;
    if (showHowToModal) {
      setShowExplodingHeart(false);
    }
  }, [showHowToModal]);

  return (
    <div>
      <DotBackground widthFull={false}>
        {showExplodingHeart ? <ExplodingHeartConfetti /> : null}

        <div className="flex flex-col w-[80%] gap-10 ">
          {sections.map((section: any, id: any) => {
            return (
              <>
                {section}
                {sections?.length !== id + 1 ? <Separator /> : null}
              </>
            );
          })}
        </div>
        <div className="fixed top-10 right-40">
          {" "}
          <Lottie
            onClick={() => setShowHowToModal(true)}
            className="cursor-pointer w-24 h-24"
            animationData={Bulb}
            loop={true}
          />
        </div>
      </DotBackground>
      <HowToModal
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
        setShowExplodingHeart={setShowExplodingHeart}
        {...howToModalLeaderboardObj}
      />
    </div>
  );
};

export default LeaderboardLayout;
