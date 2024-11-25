"use client";

import ExplodingHeartConfetti from "@/components/common/exploding-heart-confetti";
import HowToModal from "@/components/common/how-to-modal";
import { Separator } from "@/components/ui/primitives/separator";
import {
  getUserRankOfTheWeekService,
  getWeeklyLeaderboardDetailsService,
} from "@/services/leaderboard/leaderboard";
import { IconBulbFilled } from "@tabler/icons-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  const getWeeklyLeaderboardDetailsAndGetUserRankOfTheWeek = async () => {
    try {
      const response1 = await getWeeklyLeaderboardDetailsService();
      setLeaderboardList(response1?.data?.data?.leaderboardList || []);
      const response2 = await getUserRankOfTheWeekService();
      setUserRank(response2?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sections: any = [
    <Header />,
    <TopThree leaderboardList={leaderboardList} />,
    <TopTenList leaderboardList={leaderboardList} />,
    <UserRank userRank={userRank} />,
  ];

  useEffect(() => {
    if (!currentUser?._id) return;
    getWeeklyLeaderboardDetailsAndGetUserRankOfTheWeek();
  }, [currentUser]);

  useEffect(() => {
    if (!showHowToModal) return;
    if (showHowToModal) {
      setShowExplodingHeart(false);
    }
  }, [showHowToModal]);

  if (!currentUser?._id || isLoading) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center pb-5">
      {showExplodingHeart ? <ExplodingHeartConfetti /> : null}

      <div className="flex flex-col w-[80%] m-auto gap-10 ">
        {sections.map((section: any, id: any) => {
          return (
            <>
              {section}
              {sections?.length !== id + 1 ? <Separator /> : null}
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
        {...howToModalLeaderboardObj}
      />
    </div>
  );
};

export default LeaderboardLayout;
