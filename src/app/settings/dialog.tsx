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
import { useEffect, useState } from "react";

import Timer from "@/components/common/timer";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import {
  verifyOTPAndUpdateEmailService,
  verifyUpdatingEmailAndSendOTPService,
} from "@/services/user/user";
import { useDispatch } from "react-redux";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/primitives/input-otp";
import { emailRegex } from "./constants";

const EditEmailDialog = ({
  isOpen,
  onClose,
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
  const [email, setEmail] = useState("");

  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleTimerEnd = () => {
    setDisableResendOTP(false);
  };

  const onConfirmOTP = async () => {
    setIsSubmitting(true);
    try {
      await verifyOTPAndUpdateEmailService(email, otp);
      toast({
        variant: "default",
        title: "Email changed successfully ✅🎉",
        description: `We have successfully changed your email to ${email}`,
      });
      dispatch(fetchUserData());
      onClose();
      resetValues();
      setEmail("");
    } catch (error: any) {
      setOtpError(
        error?.data?.error ??
          "Something went wrong with our servers, please try again later."
      );
      toast({
        variant: "destructive",
        title: "OTP Verification failed",
        description:
          error?.data?.error ??
          "Something went wrong with our servers, please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetValues = () => {
    setDisableResendOTP(true);
    setTime(60);
    setOtpError("");
    setOtp("");
  };

  const onResendOTP = async () => {
    try {
      setIsResendingOTP(true);
      await verifyUpdatingEmailAndSendOTPService(email);
      toast({
        variant: "default",
        title: "OTP Resent to your inbox",
        description: `We've re-sent One Time Password to ${email}`,
      });
      resetValues();
    } catch (error: any) {
      console.error(error, "logged error");
      toast({
        variant: "destructive",
        title: "Unable to send otp",
        description:
          error?.message ??
          "Uh oh! Something is wrong with our server, please try again later.",
      });
    } finally {
      setIsResendingOTP(false);
    }
  };

  const onOTPChange = (otp: any) => {
    setOtp(otp);
    if (otpError) {
      setOtpError("");
    }
  };

  const isEmailInvalid = () => {
    return emailRegex.test(email);
  };

  const verifyUpdatingEmailAndSendOTP = async () => {
    setIsLoading(true);
    try {
      await verifyUpdatingEmailAndSendOTPService(email);
      setOtpSent(true);
      toast({
        variant: "default",
        title: "Check your inbox",
        description: `We've sent One Time Password to ${email} .`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Unable to send otp",
        description:
          error?.data?.message ??
          "Uh oh! Something is wrong with our server, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) return;
    setEmail("");
  }, [isOpen]);

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
                      placeholder="catscancode@witch.com"
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
                    onClick={verifyUpdatingEmailAndSendOTP}
                    disabled={isLoading || !email?.length || !isEmailInvalid()}
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
