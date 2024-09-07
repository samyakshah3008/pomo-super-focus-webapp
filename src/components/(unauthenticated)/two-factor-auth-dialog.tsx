import { saveCredentialsToBrowserStorage } from "@/lib/browser-storage";
import {
  verifyExistingUserAndSendOTPService,
  verifyOTPAndSignInUserService,
} from "@/services/authentication/signin";
import {
  verifyNewUserAndSendOTPService,
  verifyOTPAndSignUpUserService,
} from "@/services/authentication/signup";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Timer from "../common/timer";
import { Button } from "../ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/primitives/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/primitives/input-otp";
import { useToast } from "../ui/primitives/use-toast";

type FlowType = "signin" | "signup";

type TwoFactorAuthDialogProps = {
  isTwoFactorAuthenticationDialogOpen: boolean;
  onCloseTwoFactorAuthenticationDialog: () => void;
  credentials: any;
  flow: FlowType;
};

const TwoFactorAuthDialog = ({
  isTwoFactorAuthenticationDialogOpen,
  onCloseTwoFactorAuthenticationDialog,
  credentials,
  flow,
}: TwoFactorAuthDialogProps) => {
  const [disableResendOTP, setDisableResendOTP] = useState(true);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);
  const [otpError, setOtpError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleTimerEnd = () => {
    setDisableResendOTP(false);
  };

  const onConfirmOTP = async () => {
    const payload = { userDetails: { ...credentials }, otp };
    try {
      setIsSubmitting(true);
      if (flow == "signup") {
        const {
          data: { accessToken, refreshToken, user },
        } = await verifyOTPAndSignUpUserService(payload);
        saveCredentialsToBrowserStorage(accessToken, refreshToken, user?._id);
      } else {
        const {
          data: { accessToken, refreshToken, user },
        } = await verifyOTPAndSignInUserService(payload);
        saveCredentialsToBrowserStorage(accessToken, refreshToken, user?._id);
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error?.data?.error, "logged error");
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

      const payload = { userDetails: credentials };

      if (flow == "signup") {
        await verifyNewUserAndSendOTPService(payload);
      } else {
        await verifyExistingUserAndSendOTPService(payload);
      }
      toast({
        variant: "default",
        title: "OTP Resent to your inbox",
        description: `We've re-sent One Time Password to ${credentials.email}`,
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

  return (
    <Dialog
      open={isTwoFactorAuthenticationDialogOpen}
      onOpenChange={onCloseTwoFactorAuthenticationDialog}
    >
      <DialogContent>
        <DialogDescription />

        <DialogHeader>
          <DialogTitle>Two-Factor Authentication</DialogTitle>
        </DialogHeader>

        <div className="text-sm">We have sent OTP to {credentials.email}</div>

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
          <div className="text-xs font-medium text-destructive">{otpError}</div>
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
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuthDialog;
