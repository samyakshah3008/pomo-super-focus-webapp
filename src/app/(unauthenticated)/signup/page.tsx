import SignUpForm from "@/components/forms/signup";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup",
  description: "PomoSuperFocus Signup page for new PomoSuperUsers!",
};

export default async function SignUpPage({}) {
  const accessToken = getCookie("accessToken", { cookies });
  if (accessToken) {
    redirect("/dashboard");
  }

  return (
    <div className="w-screen max-w-lg px-4">
      <div className="border-border dark:bg-background z-10 rounded-xl border bg-neutral-100 p-6">
        <h1 className="text-2xl font-semibold">Create a new account</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          Create your account and unlock your true potential with deep work
          sessions, detailed focused work reports, reminder emails about top
          goals of the year and much more!
        </p>
        <hr className="-mx-6 my-4" />
        <SignUpForm />
      </div>
    </div>
  );
}
