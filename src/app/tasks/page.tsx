import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Tasks from "./tasks";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Tasks for Pomo Super Focus Users.",
};

export default async function TasksPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <Tasks />;
}
