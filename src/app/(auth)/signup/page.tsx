import Signup from "@/components/Authentication/Signup/Signup";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signup",
  description: "PomoSuperFocus Signup page for new PomoSuperUsers!",
};

const Page = async () => {
  const accessToken = getCookie("accessToken", { cookies });
  if (accessToken) {
    redirect("/dashboard");
  }

  return <Signup />;
};

export default Page;
