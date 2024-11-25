import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LeaderboardLayout from "./leaderboard-layout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Leaderboard for Pomo Super Focus Users.",
};

export default async function LeaderBoardPage() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <LeaderboardLayout />;
}
