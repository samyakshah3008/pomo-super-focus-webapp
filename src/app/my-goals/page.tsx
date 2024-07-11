import MyGoal from "@/components/MyGoals/MyGoal";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const accessToken = getCookie("accessToken", { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return <MyGoal />;
};

export default Page;
