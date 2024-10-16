import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainContainer from "./main-container";

export default async function SuperFocusPage() {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return <MainContainer />;
}
