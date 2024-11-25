import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MyLife from "./my-life";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precious Time Tracker",
  description: "Time tracker for Pomo Super Focus Users.",
};

export default async function MyLifePage() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <MyLife />;
}
