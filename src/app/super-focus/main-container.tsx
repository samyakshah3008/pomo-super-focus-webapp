"use client";

import { SuperFocusProvider } from "@/context/super-focus";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Header from "./header";
import HowTo from "./howTo";
import PomodoroContainer from "./pomodoro-container";
import Settings from "./settings";
import Tasks from "./tasks";

const bgOptions = [
  "https://ik.imagekit.io/flotes/city-bg.jpg",
  "https://v3img.voot.com/v3Storage/assets/batman-begins_ivy-16x9-carousel--1683955875734.jpg",
  "https://images.bauerhosting.com/legacy/empire-tmdb/films/272/images/65JWXDCAfwHhJKnDwRnEgVB411X.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80",
];

const MainContainer = () => {
  const [activeTab, setActiveTab] = useState("superFocus");

  const renderActiveTabComponent = () => {
    if (activeTab == "superFocus") {
      return <PomodoroContainer />;
    } else if (activeTab == "tasks") {
      return <Tasks />;
    } else if (activeTab == "howTo") {
      return <HowTo />;
    } else {
      return <Settings />;
    }
  };

  return (
    <SuperFocusProvider>
      <div
        style={
          activeTab == "superFocus"
            ? {
                backgroundImage:
                  'url("https://v3img.voot.com/v3Storage/assets/batman-begins_ivy-16x9-carousel--1683955875734.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
        className={cn(
          `min-h-screen p-5 ${
            activeTab == "superFocus" ? "bg-pomosuperfocus-gradient" : ""
          }`
        )}
      >
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderActiveTabComponent()}
      </div>
    </SuperFocusProvider>
  );
};

export default MainContainer;
