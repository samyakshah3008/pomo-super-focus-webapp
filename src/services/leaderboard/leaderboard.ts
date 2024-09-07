import { get } from "@/config/API";
import { getWeeklyLeaderboardEndpoint } from "@/constants/APIEndpoints";

const getWeeklyLeaderboardDetailsService = async () => {
  const response = await get(getWeeklyLeaderboardEndpoint);
  return response;
};

export { getWeeklyLeaderboardDetailsService };
