import { postWithToken } from "@/config/API";
import {
  activateWorkingFrameworkEndpoint,
  updateBasicInformationEndpoint,
  updateEmailEndpoint,
  updateMyLifeDetailsEndpoint,
  userDetailsEndpoint,
  verifyOTPAndUpdateEmailEndpoint,
} from "@/constants/APIEndpoints";

const updateUserDetailsService = async () => {
  const response = await postWithToken(userDetailsEndpoint, {
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

const updateBasicInformationService = async (basicInformationObj: any) => {
  const response = await postWithToken(updateBasicInformationEndpoint, {
    ...basicInformationObj,
  });
  return response;
};

const verifyUpdatingEmailAndSendOTPService = async (email: string) => {
  const response = await postWithToken(updateEmailEndpoint, { email });
  return response;
};

const verifyOTPAndUpdateEmailService = async (email: string, otp: string) => {
  const response = await postWithToken(verifyOTPAndUpdateEmailEndpoint, {
    email,
    otp,
  });
  return response;
};

export {
  activateWorkFrameworkService,
  completeMyLifeOnboardingFlowService,
  updateBasicInformationService,
  updateMyLifeDetailsService,
  updateUserDetailsService,
  verifyOTPAndUpdateEmailService,
  verifyUpdatingEmailAndSendOTPService,
};
