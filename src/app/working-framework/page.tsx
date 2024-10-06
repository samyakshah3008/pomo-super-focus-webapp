import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WorkingFrameworkLayout from "./working-framework-layout";

export const metadata: Metadata = {
  title: "Working Framework",
  description: "Working Framework for Pomo Super Focus Users.",
};

export default async function WorkingFrameworkPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <WorkingFrameworkLayout />;
}
