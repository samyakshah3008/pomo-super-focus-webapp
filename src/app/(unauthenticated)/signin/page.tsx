import SignInForm from "@/components/forms/signin";
import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signin",
  description: "PomoSuperFocus Signin page for PomoSuperUsers!",
};

export default async function SignInPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });

  if (accessToken) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="w-[512px] h-[420px] px-4">
        <div className="border-border dark:bg-background z-10 rounded-xl border bg-neutral-100 p-6">
          <h1 className="text-2xl font-semibold">Sign in to your account</h1>

          <p className="text-muted-foreground mt-2 text-sm">
            Welcome back Chief, we are lucky to have you.
          </p>
          <hr className="-mx-6 my-4" />
          <SignInForm />
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-documenso-700 duration-200 hover:opacity-70"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
