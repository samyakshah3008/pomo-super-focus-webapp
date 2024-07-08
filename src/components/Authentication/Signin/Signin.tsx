"use client";
import { saveAccessAndRefreshToken } from "@/lib/localstorage";
import {
  sendOTPToRegisteringUserService,
  verifyOTPAndSignInUserService,
} from "@/services/authentication/signin";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [newUserInfo, setNewUserInfo] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();

  const sendOtpToSigningInUser = async () => {
    const payload = { userDetails: formData };

    try {
      setOtpSent(true);
      const response = await sendOTPToRegisteringUserService(payload);
      console.log(response);
      if (response?.data?.redirect && response?.data?.flow == "signin") {
        router.replace("/signup");
        setOtpSent(false);
      } else {
        // show otp sent success
      }
    } catch (error) {
      console.error(error, "logged error");
      setOtpSent(false);
    }
  };

  const verifyAndRegisterUser = async () => {
    const payload = { userDetails: formData, otp };
    try {
      const {
        data: {
          data: { accessToken, refreshToken },
        },
      } = await verifyOTPAndSignInUserService(payload);
      saveAccessAndRefreshToken(accessToken, refreshToken);
      router.push("/dashboard");
    } catch (error) {
      console.error(error, "logged error");
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
      sendOtpToSigningInUser();
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
          <button disabled={otpSent} onClick={submitForm}>
            Submit
          </button>
        ) : (
          <button onClick={verifyAndRegisterUser}>Verify OTP</button>
        )}
      </div>
    </div>
  );
};

export default Signin;
