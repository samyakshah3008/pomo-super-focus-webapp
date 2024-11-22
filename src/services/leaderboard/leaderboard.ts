import { get } from "@/config/API";
import {
  getWeeklyLeaderboardEndpoint,
  getWeeklyUserLeaderboardEndpoint,
} from "@/constants/APIEndpoints";

const getWeeklyLeaderboardDetailsService = async () => {
  const response = await get(getWeeklyLeaderboardEndpoint);
  return response;
};

const getUserRankOfTheWeekService = async () => {
  const response = await get(`${getWeeklyUserLeaderboardEndpoint}`);
  return response;
};

export { getUserRankOfTheWeekService, getWeeklyLeaderboardDetailsService };
