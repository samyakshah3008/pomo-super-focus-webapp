import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditCustomFramework from "./edit-custom-framework";

export const metadata: Metadata = {
  title: "Edit Working Framework",
  description: "Working Framework for Pomo Super Focus Users.",
};

interface Params {
  params: {
    id: string;
  };
}

export default async function EditWorkingFrameworkPage({ params }: Params) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  const { id } = params;

  return <EditCustomFramework id={id} />;
}
