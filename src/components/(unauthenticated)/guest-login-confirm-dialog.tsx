"use client";

import { saveCredentialsToBrowserStorage } from "@/lib/browser-storage";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { signUpGuestUserService } from "@/services/authentication/signup";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/primitives/dialog";
import { Input } from "../ui/primitives/input";

type FlowType = "signin" | "signup";

type GuestLoginConfirmDialogProps = {
  isGuestLoginDialogOpen: boolean;
  onCloseGuestLoginDialog: () => void;
  flow: FlowType;
};

const GuestLoginConfirmDialog = ({
  isGuestLoginDialogOpen,
  onCloseGuestLoginDialog,
  flow,
}: GuestLoginConfirmDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestUser, setGuestUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isGuestUser: true,
  });
  const dispatch = useDispatch();

  const router = useRouter();

  const onConfirmGuestLogin = async () => {
    try {
      setIsSubmitting(true);
      const {
        data: { accessToken, refreshToken, user },
      } = await signUpGuestUserService(guestUser);
      saveCredentialsToBrowserStorage(accessToken, refreshToken, user);
      dispatch(fetchUserData());
      router.push("/dashboard");
    } catch (error) {
      console.error(error, "logged error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCreateNewAccount = () => {
    onCloseGuestLoginDialog();
  };

  return (
    <Dialog
      open={isGuestLoginDialogOpen}
      onOpenChange={onCloseGuestLoginDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Guest Login</DialogTitle>
        </DialogHeader>

        <div className="text-sm">
          Please help us with how we can call you? 😻 That's it, no OTP
          verifications.
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex flex-col gap-2">
            <div className="text-sm">First Name</div>
            <Input
              value={guestUser.firstName}
              onChange={(e) =>
                setGuestUser({ ...guestUser, firstName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm">Last Name</div>
            <Input
              value={guestUser.lastName}
              onChange={(e) =>
                setGuestUser({ ...guestUser, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm">Email</div>
          <Input
            value={guestUser.email}
            onChange={(e) =>
              setGuestUser({ ...guestUser, email: e.target.value })
            }
          />
        </div>

        <div className="text-sm bg-yellow-200 p-2 rounded-md border-yellow-500 border-solid border-2">
          You are about to Login as Guest, please note that being a guest you
          won't be getting full access like for a verified account. 🚀
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={
              flow == "signup" ? onCloseGuestLoginDialog : onCreateNewAccount
            }
            size="sm"
          >
            Close
          </Button>
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-400"
            disabled={
              isSubmitting ||
              !guestUser?.firstName.length ||
              !guestUser?.email.length
            }
            onClick={onConfirmGuestLogin}
          >
            {isSubmitting ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSubmitting ? "Setting up your account" : "Create Guest Account!"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuestLoginConfirmDialog;
