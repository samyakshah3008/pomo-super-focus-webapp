import { postWithToken } from "@/config/API";
import {
  activateWorkingFrameworkEndpoint,
  updateMyLifeDetailsEndpoint,
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

const completeMyLifeOnboardingFlowService = async (
  birthDate: any,
  estimateLifeSpan: any
) => {
  const response = await postWithToken(updateMyLifeDetailsEndpoint, {
    birthDate,
    estimateLifeSpan,
  });
  return response;
};

const updateMyLifeDetailsService = async (
  birthDate: any,
  estimateLifeSpan: any
) => {
  const response = await postWithToken(updateMyLifeDetailsEndpoint, {
    birthDate,
    estimateLifeSpan,
  });
  return response;
};

export {
  activateWorkFrameworkService,
  completeMyLifeOnboardingFlowService,
  updateMyLifeDetailsService,
  updateUserDetailsService,
};
