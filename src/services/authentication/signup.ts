import { postWithoutToken } from "@/config/API";
import {
  guestUserSignUpEndpoint,
  sendOTPToSigningUpUserEndpoint,
  verifyOTPTOSigningUpUserEndpoint,
} from "@/constants/APIEndpoints";

export const verifyNewUserAndSendOTPService = async (payload: {}) => {
  const response = await postWithoutToken(
    sendOTPToSigningUpUserEndpoint,
    payload
  );
  return response;
};

export const verifyOTPAndSignUpUserService = async (payload: {}) => {
  const response = await postWithoutToken(
    verifyOTPTOSigningUpUserEndpoint,
    payload
  );
  return response;
};

export const signUpGuestUserService = async (guestUser: any) => {
  const response = await postWithoutToken(guestUserSignUpEndpoint, {
    guestUser,
  });
  return response;
};
