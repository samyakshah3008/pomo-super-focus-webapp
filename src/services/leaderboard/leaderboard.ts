import { get } from "@/config/API";
import { getWeeklyLeaderboardEndpoint } from "@/constants/APIEndpoints";

const getWeeklyLeaderboardDetailsService = async () => {
  const response = await get(getWeeklyLeaderboardEndpoint);
  return response;
};

const getUserRankOfTheWeekService = async (userId: any) => {
  const response = await get(`${getWeeklyLeaderboardEndpoint}/${userId}`);
  return response;
};

export { getUserRankOfTheWeekService, getWeeklyLeaderboardDetailsService };
