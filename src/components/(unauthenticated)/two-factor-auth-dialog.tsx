import { Loader } from "lucide-react";
import { Button } from "../ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/primitives/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/primitives/form/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/primitives/input-otp";

type TwoFactorAuthDialogProps = {
  isTwoFactorAuthenticationDialogOpen: boolean;
  onCloseTwoFactorAuthenticationDialog: () => void;
  form: any;
  onConfirmOTP: Function;
  isSubmitting: boolean;
};

const TwoFactorAuthDialog = ({
  isTwoFactorAuthenticationDialogOpen,
  onCloseTwoFactorAuthenticationDialog,
  form,
  onConfirmOTP,
  isSubmitting,
}: TwoFactorAuthDialogProps) => {
  return (
    <Dialog
      open={isTwoFactorAuthenticationDialogOpen}
      onOpenChange={onCloseTwoFactorAuthenticationDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Two-Factor Authentication</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onConfirmOTP)}>
          <fieldset disabled={isSubmitting}>
            <FormField
              control={form.control}
              name="otpCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    We have sent OTP to {form.getValues().email}{" "}
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      {...field}
                      value={field.value ?? ""}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSubmitting ? "Verifying" : "Verify"}
              </Button>
            </DialogFooter>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuthDialog;
