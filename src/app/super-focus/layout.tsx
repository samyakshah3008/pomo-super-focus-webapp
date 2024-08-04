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
  const accessToken = getCookie("accessToken", { cookies });
  if (!accessToken) {
    redirect("/signin");
  }

  return (
    <div>
      <div>{children}</div>
      <div> {dailyProgress} </div>
      <div> {superTasks} </div>
      <div> {superTimer} </div>
    </div>
  );
};

export default SuperFocusLayout;
