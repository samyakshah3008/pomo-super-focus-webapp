import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Goals from "./goals";

export const metadata: Metadata = {
  title: "Goals Review",
  description: "Goals for Pomo Super Focus Users.",
};

export default async function GoalsPage() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return <Goals />;
}
