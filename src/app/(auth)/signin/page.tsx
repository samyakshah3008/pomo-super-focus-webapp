import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Signin from "../../../components/Authentication/Signin/Signin";

export const metadata: Metadata = {
  title: "Signin",
  description: "PomoSuperFocus Signin page for PomoSuperUsers!",
};

const Page = async () => {
  const accessToken = getCookie("accessToken", { cookies });
  if (accessToken) {
    redirect("/dashboard");
  }

  return <Signin />;
};

export default Page;
