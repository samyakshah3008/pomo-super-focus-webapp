"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog";
import { Input } from "@/components/ui/primitives/input";
import { Loader } from "lucide-react";
import { useState } from "react";

import Timer from "@/components/common/timer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/primitives/input-otp";

const EditEmailDialog = ({
  isOpen,
  onClose,
  email,
  setEmail,
  confirmEdit,
  setIsConfirmEdit,
  otpSent,
  setOtpSent,
  disableResendOTP,
  setDisableResendOTP,
  otp,
  setOtp,
  time,
  setTime,
  otpError,
  setOtpError,
  isSubmitting,
  setIsSubmitting,
  isResendingOTP,
  setIsResendingOTP,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleTimerEnd = () => {
    setDisableResendOTP(false);
  };

  const onConfirmOTP = async () => {};

  const resetValues = () => {
    setDisableResendOTP(true);
    setTime(60);
    setOtpError("");
    setOtp("");
  };
  const onResendOTP = async () => {};

  const onOTPChange = (otp: any) => {
    setOtp(otp);
    if (otpError) {
      setOtpError("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            {otpSent
              ? "Verify OTP"
              : confirmEdit
              ? "Enter new email:"
              : "Alert!"}{" "}
          </DialogTitle>
        </DialogHeader>

        {otpSent ? (
          <>
            <DialogDescription />

            <div className="text-sm">We have sent OTP to {email}</div>

            <InputOTP
              value={otp}
              onChange={(otp) => onOTPChange(otp)}
              maxLength={6}
              className="mb-10"
            >
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <InputOTPGroup key={i}>
                    <InputOTPSlot index={i} />
                    {i == 2 ? <InputOTPSeparator /> : null}
                  </InputOTPGroup>
                ))}
            </InputOTP>

            {otpError ? (
              <div className="text-xs font-medium text-destructive">
                {otpError}
              </div>
            ) : null}

            <div className="text-sm mt-1">
              {disableResendOTP ? (
                <div>
                  Resend OTP in{" "}
                  <Timer
                    showHours={false}
                    showMinutes={true}
                    showSeconds={true}
                    onTimerEnd={handleTimerEnd}
                    time={time}
                    setTime={setTime}
                  />
                </div>
              ) : null}
            </div>

            <DialogFooter className="mt-4">
              {!disableResendOTP ? (
                <Button
                  type="button"
                  disabled={isResendingOTP}
                  variant="ghost"
                  onClick={onResendOTP}
                >
                  {isResendingOTP ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Re-send OTP
                </Button>
              ) : (
                ""
              )}
              <Button
                onClick={onConfirmOTP}
                disabled={isSubmitting || otp.length < 6}
              >
                {isSubmitting ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSubmitting ? "Verifying" : "Verify"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogDescription>
              {confirmEdit ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="font-bold">Email:</div>{" "}
                    <Input
                      type="email"
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="border-2 border-solid border-red-500 p-2 rounded-md bg-red-100">
                  Are you sure you want to change your email address? Please
                  note that this action is irreversible and all subscriptions to
                  current email will be stopped.{" "}
                </div>
              )}
            </DialogDescription>

            <DialogFooter className="mt-4">
              {confirmEdit ? (
                <>
                  <Button onClick={onClose} variant="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setOtpSent(true)}
                    disabled={isLoading || !email?.length}
                  >
                    {isLoading ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isLoading ? "Sending OTP..." : "Verify with OTP"}
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => setIsConfirmEdit(true)}
                >
                  Yes, I am very sure to change my email address!
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditEmailDialog;
