"use client";

import { useToast } from "@/components/ui/primitives/use-toast";
import { SuperFocusProvider } from "@/context/super-focus";
import { fetchSuperFocusSettingsService } from "@/services/super-focus/super-focus";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import PomodoroContainer from "./pomodoro-container";

const MainContainer = () => {
  const [currentSettingDetails, setCurrentSettingDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);

  const { toast } = useToast();

  const fetchSuperFocusSettings = async () => {
    try {
      const response = await fetchSuperFocusSettingsService();
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
      <div className="min-h-screen p-5">
        <PomodoroContainer currentSettingDetails={currentSettingDetails} />
      </div>
    </SuperFocusProvider>
  );
};

export default MainContainer;
