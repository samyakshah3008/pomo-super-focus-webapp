"use client";

import { Input } from "@/components/ui/primitives/input";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import EditEmailDialog from "./dialog";

const CredentialInformation = ({ email, setEmail, isGuestUser }: any) => {
  const [isEditEmailDialogOpen, setIsEditEmailDialogOpen] = useState(false);
  const [confirmEdit, setIsConfirmEdit] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [disableResendOTP, setDisableResendOTP] = useState(true);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);
  const [otpError, setOtpError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);

  const onClose = () => {
    setIsEditEmailDialogOpen(false);
    setTimeout(() => {
      setIsConfirmEdit(false);
      setDisableResendOTP(true);
      setTime(60);
      setOtpError("");
      setOtp("");
      setOtpSent(false);
      setIsSubmitting(false);
      setIsResendingOTP(false);
    }, 1500);
  };
  return (
    <>
      <div className="flex flex-col gap-4 border-2 rounded-md p-4">
        <div className="flex justify-between">
          <h1 className="font-bold">Credentials Details:</h1>
          <IconEdit
            cursor="pointer"
            size={24}
            onClick={() => {
              if (!isGuestUser) {
                setIsEditEmailDialogOpen(true);
              }
            }}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-4 flex-1">
            Email Address: <Input className="" disabled={true} value={email} />
          </div>
        </div>
      </div>
      <EditEmailDialog
        isOpen={isEditEmailDialogOpen}
        onClose={onClose}
        confirmEdit={confirmEdit}
        setIsConfirmEdit={setIsConfirmEdit}
        otpSent={otpSent}
        setOtpSent={setOtpSent}
        disableResendOTP={disableResendOTP}
        setDisableResendOTP={setDisableResendOTP}
        otp={otp}
        setOtp={setOtp}
        time={time}
        setTime={setTime}
        otpError={otpError}
        setOtpError={setOtpError}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        isResendingOTP={isResendingOTP}
        setIsResendingOTP={setIsResendingOTP}
      />
    </>
  );
};

export default CredentialInformation;
