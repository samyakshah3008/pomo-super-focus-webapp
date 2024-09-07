import { get, patch } from "@/config/API";
import {
  dailyProgressEndpoint,
  streakDetailsEndpoint,
  updateDailyFocusTimeGoalEndpoint,
} from "@/constants/APIEndpoints";

const getDailyProgressStatsService = async (userId: {}) => {
  const response = await get(dailyProgressEndpoint, userId);
  return response;
};

const getStreakDetailsService = async (userId: {}) => {
  const response = await get(streakDetailsEndpoint, userId);
  return response;
};

const updateDailyFocusTimeService = async (payload: {}) => {
  const response = await patch(updateDailyFocusTimeGoalEndpoint, payload);
  return response;
};

export {
  getDailyProgressStatsService,
  getStreakDetailsService,
  updateDailyFocusTimeService,
};
