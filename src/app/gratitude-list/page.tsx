import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GratitudeList from "./gratitude-list";

export const metadata: Metadata = {
  title: "Gratitude List",
  description: "Gratitude List for Pomo Super Focus Users.",
};

export default async function DashboardPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return <GratitudeList />;
}
