import SignUpForm from "@/components/forms/signup";
import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup",
  description: "PomoSuperFocus Signup page for new PomoSuperUsers!",
};

export default async function SignUpPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (accessToken) {
    redirect("/dashboard");
  }

  return (
    <div className="w-screen max-w-lg px-4 flex flex-col gap-5 items-center">
      <div className="border-border dark:bg-background z-10 rounded-xl border bg-neutral-100 p-6">
        <h1 className="text-2xl font-semibold">Create a new account</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          Create your account and unlock your best version with deep work
          sessions, goals, daily tasks, habits, gratitudes, life tracker and
          much more!
        </p>
        <hr className="-mx-6 my-4" />
        <SignUpForm />
        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-documenso-700 duration-200 hover:opacity-70"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
