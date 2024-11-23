"use client";

import PomodoroSideNav from "@/components/layouts/pomodoro-side-nav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <PomodoroSideNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default layout;
