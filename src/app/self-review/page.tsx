import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SelfReview from "./self-review";

export const metadata: Metadata = {
  title: "Self Review",
  description: "Self Reviewing for Pomo Super Focus Users.",
};

export default async function SelfReviewPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <SelfReview />;
}
