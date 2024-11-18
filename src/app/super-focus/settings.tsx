"use client";

import { useToast } from "@/components/ui/primitives/use-toast";
import { postWithToken } from "@/config/API";
import { updateSuperFocusSettingsEndpoint } from "@/constants/APIEndpoints";
import { useState } from "react";
import SectionFour from "./section-four";
import SectionOne from "./section-one";
import SectionThree from "./section-three";
import SectionTwo from "./section-two";

const Settings = ({
  setSuperFocusDetails,
  superFocusDetails,
  fetchSuperFocusSettings,
  currentSettingDetails,
}: any) => {
  const [isTimeSectionEditing, setIsTimeSectionEditing] = useState(false);
  const [isStudySectionEditing, setIsStudySectionEditing] = useState(false);
  const [isBreakSectionEditing, setIsBreakSectionEditing] = useState(false);
  const [isUIOptionsEditing, setIsUIOptionsEditing] = useState(false);

  const { toast } = useToast();

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

  return (
    <div className="flex flex-col gap-4 w-[70%] m-auto ">
      <SectionOne
        isTimeSectionEditing={isTimeSectionEditing}
        setIsTimeSectionEditing={setIsTimeSectionEditing}
        saveSettings={saveSettings}
        superFocusDetails={superFocusDetails}
        setSuperFocusDetails={setSuperFocusDetails}
        onCancelEdit={onCancelEdit}
      />

      <SectionTwo
        isStudySectionEditing={isStudySectionEditing}
        setIsStudySectionEditing={setIsStudySectionEditing}
        saveSettings={saveSettings}
        superFocusDetails={superFocusDetails}
        setSuperFocusDetails={setSuperFocusDetails}
        onCancelEdit={onCancelEdit}
      />

      <SectionThree
        isBreakSectionEditing={isBreakSectionEditing}
        setIsBreakSectionEditing={setIsBreakSectionEditing}
        saveSettings={saveSettings}
        superFocusDetails={superFocusDetails}
        setSuperFocusDetails={setSuperFocusDetails}
      />

      <SectionFour
        isUIOptionsEditing={isUIOptionsEditing}
        setIsUIOptionsEditing={setIsUIOptionsEditing}
        saveSettings={saveSettings}
        superFocusDetails={superFocusDetails}
        setSuperFocusDetails={setSuperFocusDetails}
      />
    </div>
  );
};

export default Settings;
