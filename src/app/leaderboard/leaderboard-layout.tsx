"use client";

import { DotBackground } from "@/components/common/grid-and-dot-background";
import { Separator } from "@/components/ui/primitives/separator";
import { getLocalStorageItem } from "@/lib/browser-storage";
import {
  getUserRankOfTheWeekService,
  getWeeklyLeaderboardDetailsService,
} from "@/services/leaderboard/leaderboard";
import { useEffect, useState } from "react";
import Header from "./header";
import TopTenList from "./top-ten-list";
import TopThree from "./top-three";
import UserRank from "./user-rank";

const LeaderboardLayout = () => {
  const [leaderboardList, setLeaderboardList] = useState([]);
  const [userRank, setUserRank] = useState<any>(null);

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

  return (
    <div>
      <DotBackground>
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
      </DotBackground>
    </div>
  );
};

export default LeaderboardLayout;
