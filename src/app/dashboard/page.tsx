import GreetingModal from "@/components/(dashboard)/greeting-modal";
import { DotBackground } from "@/components/common/grid-and-dot-background";
import { Separator } from "@/components/ui/primitives/separator";
import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Checklist from "./checklist";
import Header from "./header";
import ProgressReview from "./progress-review";
import QuickStart from "./quick-start";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for Pomo Super Focus Users.",
};

export default async function DashboardPage({}) {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  const sections = [
    <Header />,
    <Checklist />,
    <QuickStart />,
    <ProgressReview />,
  ];

  return (
    <div>
      <GreetingModal />
      <DotBackground>
        <div className="flex flex-col w-[80%] gap-10 ">
          {sections.map((section, id) => {
            return (
              <>
                {section}
                {sections?.length !== id ? <Separator /> : null}
              </>
            );
          })}
        </div>
      </DotBackground>
    </div>
  );
}
