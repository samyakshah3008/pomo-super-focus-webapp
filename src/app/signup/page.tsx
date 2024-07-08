import Signup from "@/components/Authentication/Signup/Signup";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const accessToken = getCookie("accessToken", { cookies });
  if (accessToken) {
    redirect("/dashboard");
  }

  return <Signup />;
};

export default Page;
