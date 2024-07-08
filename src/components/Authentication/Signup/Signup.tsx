"use client";
import { saveAccessAndRefreshToken } from "@/lib/localstorage";
import {
  signUpGuestUserService,
  verifyOTPAndSignUpUserService,
  verifyUserAndSendOTPService,
} from "@/services/authentication/signup";
import { shallUserRedirectToSignin } from "@/utils/authentication";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
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
      if (shallUserRedirectToSignin(response)) {
        router.replace("/signin");
        setOtpSent(false);
      } else {
        setOtpSent(true);
        // show otp sent success
      }
    } catch (error) {
      console.error(error, "something went wrong");
      setOtpSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTPAndSignUpUser = async () => {
    const payload = { userDetails: formData, otp };
    try {
      setIsLoading(true);
      const {
        data: { accessToken, refreshToken },
      } = await verifyOTPAndSignUpUserService(payload);
      saveAccessAndRefreshToken(accessToken, refreshToken);
      router.push("/dashboard");
    } catch (error) {
      console.error(error, "logged error");
    } finally {
      setIsLoading(false);
    }
  };

  const signUpGuestUser = async () => {
    try {
      setIsLoading(true);
      const {
        data: { accessToken, refreshToken },
      } = await signUpGuestUserService();
      saveAccessAndRefreshToken(accessToken, refreshToken);
      router.push("/dashboard");
    } catch (error) {
      console.error(error, "logged error");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTPAndSignUpUserClickHandler = () => {
    verifyOTPAndSignUpUser();
  };

  const signUpGuestUserClickHandler = () => {
    signUpGuestUser();
  };

  const formDataChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitFormClickHandler = () => {
    if (!formData.email || !formData.firstName) {
      console.log("all fields are required");
    } else {
      verifyUserAndSendOTP();
    }
  };

  const otpInputChangeHandler = (e: any) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <div>This is a signup page</div>
      <div>Email: </div>
      <input
        style={{ border: "2px solid black" }}
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <div>First Name: </div>
      <input
        style={{ border: "2px solid black" }}
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <div>Last Name: </div>
      <input
        style={{ border: "2px solid black" }}
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => formDataChangeHandler(e)}
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
          <button disabled={isLoading} onClick={submitFormClickHandler}>
            Submit
          </button>
        ) : (
          <button
            disabled={isLoading}
            onClick={verifyOTPAndSignUpUserClickHandler}
          >
            Verify OTP
          </button>
        )}
      </div>

      <div>
        <button disabled={isLoading} onClick={signUpGuestUserClickHandler}>
          POMO SUPER GUEST LOGIN?{" "}
        </button>
      </div>
    </div>
  );
};

export default Signup;
