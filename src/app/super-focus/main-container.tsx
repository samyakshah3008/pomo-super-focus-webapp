"use client";

import WelcomeModal from "@/components/(super-focus)/welcome-modal";
import { useToast } from "@/components/ui/primitives/use-toast";
import { SuperFocusProvider } from "@/context/super-focus";
import { fetchSuperFocusSettingsService } from "@/services/super-focus/super-focus";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import PomodoroContainer from "./pomodoro-container";

const MainContainer = () => {
  const [currentSettingDetails, setCurrentSettingDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

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
      setShowWelcomeModal(true);
    }
  };

  useEffect(() => {
    fetchSuperFocusSettings();
  }, []);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SuperFocusProvider>
      <div className="p-5">
        <PomodoroContainer currentSettingDetails={currentSettingDetails} />
      </div>
      <WelcomeModal show={showWelcomeModal} setShow={setShowWelcomeModal} />
    </SuperFocusProvider>
  );
};

export default MainContainer;
