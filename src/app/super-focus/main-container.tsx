"use client";

import { useToast } from "@/components/ui/primitives/use-toast";
import { SuperFocusProvider } from "@/context/super-focus";
import { cn } from "@/lib/utils";
import { fetchSuperFocusSettingsService } from "@/services/super-focus/super-focus";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "./header";
import HowTo from "./howTo";
import PomodoroContainer from "./pomodoro-container";
import Settings from "./settings";
import Tasks from "./tasks";

const MainContainer = () => {
  const [activeTab, setActiveTab] = useState("superFocus");
  const [superFocusDetails, setSuperFocusDetails] = useState(null);
  const [currentSettingDetails, setCurrentSettingDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);

  const { toast } = useToast();

  const fetchSuperFocusSettings = async () => {
    try {
      const response = await fetchSuperFocusSettingsService();
      setSuperFocusDetails(response?.data?.data?.superFocusRecordDetails);
      setCurrentSettingDetails(response?.data?.data?.superFocusRecordDetails);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to fetch your super focus record! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderActiveTabComponent = () => {
    if (activeTab == "superFocus") {
      return (
        <PomodoroContainer currentSettingDetails={currentSettingDetails} />
      );
    } else if (activeTab == "tasks") {
      return <Tasks />;
    } else if (activeTab == "howTo") {
      return <HowTo />;
    } else {
      return (
        <Settings
          setSuperFocusDetails={setSuperFocusDetails}
          superFocusDetails={superFocusDetails}
          fetchSuperFocusSettings={fetchSuperFocusSettings}
          currentSettingDetails={currentSettingDetails}
        />
      );
    }
  };

  useEffect(() => {
    fetchSuperFocusSettings();
  }, []);

  useEffect(() => {
    if (currentSettingDetails?.uiOptions?.backgroundImageUrl) {
      const img = new Image();
      img.src = currentSettingDetails?.uiOptions?.backgroundImageUrl;
      img.onload = () => setIsImageValid(true);
      img.onerror = () => setIsImageValid(false);
    }
  }, [currentSettingDetails?.uiOptions?.backgroundImageUrl]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SuperFocusProvider>
      <div
        style={
          activeTab == "superFocus"
            ? currentSettingDetails?.uiOptions?.backgroundImageUrl &&
              isImageValid
              ? {
                  backgroundImage: `url(${currentSettingDetails?.uiOptions?.backgroundImageUrl}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : { background: "linear-gradient(140deg,#13171f,#1e1e2e)" }
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
