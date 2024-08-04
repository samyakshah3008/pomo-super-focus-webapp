"use client";

import { saveAccessAndRefreshToken } from "@/lib/localstorage";
import {
  verifyOTPAndSignInUserService,
  verifyUserAndSendOTPService,
} from "@/services/authentication/signin";
import { shallUserRedirectToSignup } from "@/utils/authentication";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [newUserInfo, setNewUserInfo] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const verifyUserAndSendOTP = async () => {
    const payload = { userDetails: formData };

    try {
      setIsLoading(true);
      const response = await verifyUserAndSendOTPService(payload);
      if (shallUserRedirectToSignup(response)) {
        router.replace("/signup");
        setOtpSent(false);
      } else {
        setOtpSent(true);

        // show otp sent success
      }
    } catch (error) {
      console.error(error, "logged error");
      setOtpSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTPAndSignInUser = async () => {
    const payload = { userDetails: formData, otp };
    try {
      setIsLoading(true);
      const {
        data: { accessToken, refreshToken },
      } = await verifyOTPAndSignInUserService(payload);
      saveAccessAndRefreshToken(accessToken, refreshToken);
      router.push("/dashboard");
    } catch (error) {
      console.error(error, "logged error");
    } finally {
      setIsLoading(false);
    }
  };

  const formDataChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const otpInputChangeHandler = (e: any) => {
    setOtp(e.target.value);
  };

  const submitForm = () => {
    if (!formData.email) {
      console.log("email is required");
    } else {
      verifyUserAndSendOTP();
    }
  };

  return (
    <div>
      <div>This is a signin page</div>
      <div>Email: </div>
      <input
        style={{ border: "2px solid black" }}
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={formDataChangeHandler}
      />
      {otpSent ? (
        <div>
          <div>OTP: </div>
          <input
            style={{ border: "2px solid black" }}
            name="otp"
            placeholder="000000"
            value={otp}
            onChange={otpInputChangeHandler}
          />
        </div>
      ) : null}

      <div>
        {!otpSent ? (
          <button disabled={isLoading} onClick={submitForm}>
            Submit
          </button>
        ) : (
          <button disabled={isLoading} onClick={verifyOTPAndSignInUser}>
            Verify OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInForm;
