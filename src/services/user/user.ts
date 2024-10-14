import { postWithToken } from "@/config/API";
import {
  activateWorkingFrameworkEndpoint,
  userDetailsEndpoint,
} from "@/constants/APIEndpoints";

const updateUserDetailsService = async (userId: string | null) => {
  const response = await postWithToken(userDetailsEndpoint, {
    userId,
    isGreetingModalShown: true,
  });
  return response;
};

const activateWorkFrameworkService = async (
  userId: string,
  workingFramework: any
) => {
  const response = await postWithToken(activateWorkingFrameworkEndpoint, {
    userId,
    workingFramework,
  });
  return response;
};

export { activateWorkFrameworkService, updateUserDetailsService };
