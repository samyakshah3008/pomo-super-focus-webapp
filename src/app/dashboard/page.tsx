import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayout from "./dashboard-layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for Pomo Super Focus Users.",
};

export default async function DashboardPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return <DashboardLayout />;
}
