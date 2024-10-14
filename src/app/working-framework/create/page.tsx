import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateFramework from "./create-framework";

export const metadata: Metadata = {
  title: "Create Working Framework",
  description: "Working Framework for Pomo Super Focus Users.",
};

export default async function WorkingFrameworkPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <CreateFramework />;
}
