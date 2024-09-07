import { accessTokenKeyBrowserStorage } from "@/constants/browser-storage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const SuperFocusLayout = ({
  children,
  dailyProgress,
  superTasks,
  superTimer,
}: {
  children: React.ReactNode;
  dailyProgress: React.ReactNode;
  superTasks: React.ReactNode;
  superTimer: React.ReactNode;
}) => {
  const accessToken = getCookie(accessTokenKeyBrowserStorage, { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return (
    <div>
      <div>{children}</div>
      <div className="m-auto w-10/12 flex flex-col items-start justify-center mt-36">
        <div className="flex flex-row justify-around items-center w-full">
          <div> {superTimer} </div>
          <div> {dailyProgress} </div>
        </div>
        <div> {superTasks} </div>
      </div>
    </div>
  );
};

export default SuperFocusLayout;
