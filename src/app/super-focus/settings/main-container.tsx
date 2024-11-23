"use client";

import { useToast } from "@/components/ui/primitives/use-toast";
import { postWithToken } from "@/config/API";
import { updateSuperFocusSettingsEndpoint } from "@/constants/APIEndpoints";
import { fetchSuperFocusSettingsService } from "@/services/super-focus/super-focus";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./header";
import SectionFour from "./section-four";
import SectionOne from "./section-one";
import SectionThree from "./section-three";
import SectionTwo from "./section-two";

const MainContainer = () => {
  const [isTimeSectionEditing, setIsTimeSectionEditing] = useState(false);
  const [isStudySectionEditing, setIsStudySectionEditing] = useState(false);
  const [isBreakSectionEditing, setIsBreakSectionEditing] = useState(false);
  const [isUIOptionsEditing, setIsUIOptionsEditing] = useState(false);
  const [currentSettingDetails, setCurrentSettingDetails] = useState(null);
  const [superFocusDetails, setSuperFocusDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestUser, setIsGuestUser] = useState(false);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

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

  const onCancelEdit = (section: any) => {
    setSuperFocusDetails(currentSettingDetails);
    if (section == 1) {
      setIsTimeSectionEditing(false);
    } else if (section == 2) {
      setIsStudySectionEditing(false);
    } else if (section == 3) {
      setIsBreakSectionEditing(false);
    } else {
      setIsUIOptionsEditing(false);
    }
  };

  const saveSettings = async (section: any) => {
    try {
      await postWithToken(updateSuperFocusSettingsEndpoint, {
        newSettings: superFocusDetails,
      });
      toast({ title: "Settings updated successfully! ✅" });
      fetchSuperFocusSettings();
    } catch (error) {
      toast({
        title: "Settings failed to update! ❌",
        variant: "destructive",
        description: "Failed to update settings, please try again later. ",
      });
    } finally {
      if (section == 1) {
        setIsTimeSectionEditing(false);
      } else if (section == 2) {
        setIsStudySectionEditing(false);
      } else if (section == 3) {
        setIsBreakSectionEditing(false);
      } else {
        setIsUIOptionsEditing(false);
      }
    }
  };

  useEffect(() => {
    fetchSuperFocusSettings();
  }, []);

  useEffect(() => {
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
    } else {
      setIsGuestUser(false);
    }
  }, [currentUser]);

  if (isLoading || !currentUser?._id) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      <Header />
      <div className="flex flex-col gap-4 w-[80%] m-auto">
        {isGuestUser ? (
          <div className="underline text-red-500 font-bold text-center">
            Please note that since you are a guest user, you cannot edit this
            settings for now!{" "}
          </div>
        ) : null}

        <SectionOne
          isTimeSectionEditing={isTimeSectionEditing}
          setIsTimeSectionEditing={setIsTimeSectionEditing}
          saveSettings={saveSettings}
          superFocusDetails={superFocusDetails}
          setSuperFocusDetails={setSuperFocusDetails}
          onCancelEdit={onCancelEdit}
          isGuestUser={isGuestUser}
        />

        <SectionTwo
          isStudySectionEditing={isStudySectionEditing}
          setIsStudySectionEditing={setIsStudySectionEditing}
          saveSettings={saveSettings}
          superFocusDetails={superFocusDetails}
          setSuperFocusDetails={setSuperFocusDetails}
          onCancelEdit={onCancelEdit}
          isGuestUser={isGuestUser}
        />

        <SectionThree
          isBreakSectionEditing={isBreakSectionEditing}
          setIsBreakSectionEditing={setIsBreakSectionEditing}
          saveSettings={saveSettings}
          superFocusDetails={superFocusDetails}
          setSuperFocusDetails={setSuperFocusDetails}
          isGuestUser={isGuestUser}
        />

        <SectionFour
          isUIOptionsEditing={isUIOptionsEditing}
          setIsUIOptionsEditing={setIsUIOptionsEditing}
          saveSettings={saveSettings}
          superFocusDetails={superFocusDetails}
          setSuperFocusDetails={setSuperFocusDetails}
          isGuestUser={isGuestUser}
        />
      </div>
    </div>
  );
};

export default MainContainer;
