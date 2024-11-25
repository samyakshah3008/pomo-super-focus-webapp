"use client";

import { cn } from "@/lib/utils";
import { verifyExistingUserAndSendOTPService } from "@/services/authentication/signin";
import { shallUserRedirectToSignup } from "@/utils/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GuestLoginConfirmDialog from "../(unauthenticated)/guest-login-confirm-dialog";
import TwoFactorAuthDialog from "../(unauthenticated)/two-factor-auth-dialog";
import { GuestLoginButton } from "../ui/components/button/guest-login-button";
import { ORLineSeperator } from "../ui/components/helpers/line-seperator";
import { Button } from "../ui/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/primitives/form/form";
import { Input } from "../ui/primitives/input";
import { useToast } from "../ui/primitives/use-toast";

export const ZSignInFormSchema = z.object({
  email: z.string().trim().email(),
});

export type TSignInFormSchema = z.infer<typeof ZSignInFormSchema>;

export type SignInFormProps = {
  className?: string;
  initialEmail?: string;
};

const SignInForm = ({ className, initialEmail }: SignInFormProps) => {
  const [
    isTwoFactorAuthenticationDialogOpen,
    setIsTwoFactorAuthenticationDialogOpen,
  ] = useState(false);

  const [isGuestLoginDialogOpen, setIsGuestLoginDialogOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<TSignInFormSchema>({
    values: {
      email: "",
    },
    resolver: zodResolver(ZSignInFormSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onCloseTwoFactorAuthenticationDialog = () => {
    setIsTwoFactorAuthenticationDialogOpen(false);
  };

  const onCloseGuestLoginDialog = () => {
    setIsGuestLoginDialogOpen(false);
  };

  const onFormSubmit = async ({ email }: TSignInFormSchema) => {
    try {
      const credentials: Record<string, string> = {
        email,
      };

      const payload = { userDetails: credentials };
      const response = await verifyExistingUserAndSendOTPService(payload);

      if (shallUserRedirectToSignup(response)) {
        router.replace(`/signup?email=${email}`);
      } else {
        setIsTwoFactorAuthenticationDialogOpen(true);
        toast({
          variant: "default",
          title: "Check your inbox",
          description: `We've sent One Time Password to ${email} .`,
        });
      }
    } catch (error: any) {
      console.error(error, "logged error");
      toast({
        variant: "destructive",
        title: "Unable to send otp",
        description:
          error?.message ??
          "Uh oh! Something is wrong with our server, please try again later.",
      });
    }
  };

  const onGuestLoginSubmit = () => {
    setIsGuestLoginDialogOpen(true);
  };

  const preFillForm = () => {
    const email: any = searchParams.get("email");

    if (email?.length) {
      form.setValue("email", email);
      toast({
        variant: "default",
        title: "Account already exists",
        description: `Sign in to your account instead, chief!`,
      });
    }
  };

  useEffect(() => {
    preFillForm();
  }, []);

  return (
    <Form {...form}>
      <form
        className={cn("flex w-full flex-col gap-y-4", className)}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <fieldset
          className="flex w-full flex-col gap-y-4"
          disabled={isSubmitting}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="catscancode@witch.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            disabled={true}
            // disabled={isSubmitting}
            className="dark:hover:opacity-90"
          >
            {isSubmitting ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSubmitting ? "Signing in" : "Sign In"}
          </Button>

          <ORLineSeperator />

          <div className="flex flex-col space-y-4">
            <GuestLoginButton
              disabled={isSubmitting}
              onClick={onGuestLoginSubmit}
            />
          </div>
        </fieldset>
      </form>

      <TwoFactorAuthDialog
        isTwoFactorAuthenticationDialogOpen={
          isTwoFactorAuthenticationDialogOpen
        }
        credentials={{ email: form.getValues("email") }}
        onCloseTwoFactorAuthenticationDialog={
          onCloseTwoFactorAuthenticationDialog
        }
        flow="signin"
      />

      <GuestLoginConfirmDialog
        isGuestLoginDialogOpen={isGuestLoginDialogOpen}
        onCloseGuestLoginDialog={onCloseGuestLoginDialog}
        flow="signin"
      />
    </Form>
  );
};

export default SignInForm;
