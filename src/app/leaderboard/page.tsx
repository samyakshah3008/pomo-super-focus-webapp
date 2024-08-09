import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LeaderboardData from "./leaderboard-data";

export default async function LeaderBoardPage() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return (
    <div>
      Here Leaderboard page is under construction
      <LeaderboardData />
    </div>
  );
}
