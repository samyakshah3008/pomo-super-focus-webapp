import { postWithoutToken } from "@/config/API";
import {
  sendOTPToSigningInUserEndpoint,
  verifyOTPToSigningInUserEndpoint,
} from "@/constants/APIEndpoints";

export const verifyExistingUserAndSendOTPService = async (payload: {}) => {
  const response = await postWithoutToken(
    sendOTPToSigningInUserEndpoint,
    payload
  );
  return response;
};

export const verifyOTPAndSignInUserService = async (payload: {}) => {
  const response = await postWithoutToken(
    verifyOTPToSigningInUserEndpoint,
    payload
  );
  return response;
};
