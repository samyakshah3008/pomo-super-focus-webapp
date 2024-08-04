import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SuperFocus from "./super-focus";

export default async function SuperFocusPage() {
  const accessToken = getCookie("accessToken", { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return (
    <div>
      Super Focus Screen Under construction
      <SuperFocus />
    </div>
  );
}
