"use client";

import { getWeeklyLeaderboardDetailsService } from "@/services/leaderboard/leaderboard";
import { useEffect, useState } from "react";

const LeaderboardData = () => {
  const [leaderboardList, setLeaderboardList] = useState([]);
  const getWeeklyLeaderboardDetails = async () => {
    try {
      const response = await getWeeklyLeaderboardDetailsService();
      setLeaderboardList(response?.data?.data?.leaderboardList || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeeklyLeaderboardDetails();
  }, []);

  return (
    <div>
      This is leaderboard page
      {leaderboardList?.length
        ? leaderboardList.map((user: any) => {
            return (
              <div key={user?.userId}>
                <div>{user?.userDetails?.email}</div>
                <div>{user?.totalTime}</div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default LeaderboardData;
