import { saveAccessAndRefreshToken } from "@/lib/localstorage";
import { signUpGuestUserService } from "@/services/authentication/signup";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/primitives/dialog";

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

  const router = useRouter();

  const onConfirmGuestLogin = async () => {
    try {
      setIsSubmitting(true);
      const {
        data: { accessToken, refreshToken },
      } = await signUpGuestUserService();
      saveAccessAndRefreshToken(accessToken, refreshToken);
      router.push("/dashboard");
    } catch (error) {
      console.error(error, "logged error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCreateNewAccount = () => {
    router.push("/signup");
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
          You are about to Login as Guest, please note that being a guest you
          won't be getting full access like for a verified account.
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={
              flow == "signup" ? onCloseGuestLoginDialog : onCreateNewAccount
            }
          >
            Create New Account
          </Button>
          <Button
            variant="destructive"
            disabled={isSubmitting}
            onClick={onConfirmGuestLogin}
          >
            {isSubmitting ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSubmitting ? "Setting up your account" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuestLoginConfirmDialog;
