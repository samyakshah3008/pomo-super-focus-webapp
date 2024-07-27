import { get } from "@/config/API";
import {
  dailyProgressEndpoint,
  streakDetailsEndpoint,
} from "@/constants/APIEndpoints";

const getDailyProgressStatsService = async (userId: {}) => {
  const response = await get(dailyProgressEndpoint, userId);
  return response;
};

const getStreakDetailsService = async (userId: {}) => {
  const response = await get(streakDetailsEndpoint, userId);
  return response;
};

export { getDailyProgressStatsService, getStreakDetailsService };
