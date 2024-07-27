"use client";

import { userId } from "@/constants/user";
import {
  getDailyProgressStatsService,
  getStreakDetailsService,
} from "@/services/daily-progress/daily-progress";
import { useEffect, useState } from "react";

const DailyProgress = () => {
  const [dailyProgressStats, setDailyProgressStats] = useState(null);
  const [streakDetailsObj, setStreakDetailsObj] = useState({});

  const getDailyProgressStats = async () => {
    const queryParam = {
      userId,
    };
    try {
      const response = await getDailyProgressStatsService(queryParam);
      setDailyProgressStats(response?.data?.data);
    } catch (error) {
      console.log(error, "error while getting daily progress stats. ");
    }
  };

  const getStreakDetails = async () => {
    const queryParam = {
      userId,
      currentDate: new Date().toISOString(),
    };
    try {
      const response = await getStreakDetailsService(queryParam);
      const streakDetails = response?.data?.data?.streakDetails;
      setStreakDetailsObj(streakDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDailyProgressStats();
    getStreakDetails();
  }, []);

  if (!dailyProgressStats) return;

  return (
    <div>
      Daily Progress Component
      <div>
        Yesterday's Focus Time: {dailyProgressStats?.yesterday?.totalTime}{" "}
      </div>
      <div>
        Today's total focus time so far: {dailyProgressStats?.today?.totalTime}{" "}
      </div>
      <div>Streak: {streakDetailsObj?.streakCount} </div>
      <div>Highest Streak: {streakDetailsObj?.highestStreak}</div>
    </div>
  );
};

export default DailyProgress;
