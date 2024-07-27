import Leaderboard from "@/components/Leaderboard/Leaderboard";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const accessToken = getCookie("accessToken", { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <Leaderboard />;
};

export default Page;
