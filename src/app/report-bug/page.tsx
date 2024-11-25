import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainContainer from "./main-container";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Bug",
  description: "Report Bug for Pomo Super Focus Users.",
};

export default async function ReportBugPage() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <MainContainer />;
}
