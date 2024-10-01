import { postWithToken } from "@/config/API";
import { userDetailsEndpoint } from "@/constants/APIEndpoints";

const updateUserDetailsService = async (userId: string | null) => {
  const response = await postWithToken(userDetailsEndpoint, {
    userId,
    isGreetingModalShown: true,
  });
  return response;
};

export { updateUserDetailsService };
