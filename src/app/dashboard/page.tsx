import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "../../components/Dashboard";

const Page = async () => {
  const accessToken = getCookie("accessToken", { cookies });
  if (!accessToken) {
    redirect("/signin");
  }
  return <Dashboard />;
};

export default Page;
