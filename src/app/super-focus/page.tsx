import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainContainer from "./main-container";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuperFocus Timer",
  description: "SuperFocus Timer for Pomo Super Focus Users.",
};

export default async function SuperFocusPage() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return <MainContainer />;
}
