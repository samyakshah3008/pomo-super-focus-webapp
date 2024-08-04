import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "../../components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for Pomo Super Focus Users.",
};

const Page = async () => {
  const accessToken = getCookie("accessToken", { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <Dashboard />;
};

export default Page;
