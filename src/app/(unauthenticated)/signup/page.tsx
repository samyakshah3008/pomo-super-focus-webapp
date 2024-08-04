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
        <h1 className="text-2xl font-semibold">Sign in to your account</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          Welcome back, we are lucky to have you.
        </p>
        <hr className="-mx-6 my-4" />
        <div>Signin form will come here. </div>
        <SignUpForm />
      </div>
    </div>
  );
}
