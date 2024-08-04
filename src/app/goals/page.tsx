import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserGoals from "./user-goals";

export default async function GoalsPage() {
  const accessToken = getCookie("accessToken", { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return (
    <div>
      Goals Under construction
      <UserGoals />
    </div>
  );
}
