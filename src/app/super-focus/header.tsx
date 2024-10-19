"use client";

import {
  getBgColorClass,
  getBorderClass,
  getColorClass,
} from "@/components/(super-focus)/helper";
import ReusableDialog from "@/components/common/reusable-dialog";
import { Separator } from "@/components/ui/primitives/separator";
import { useSuperFocus } from "@/context/super-focus";
import { cn } from "@/lib/utils";
import {
  IconBulb,
  IconChecklist,
  IconFocus2,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = ({ activeTab, setActiveTab }: any) => {
  const [isConfirmExitDialogOpen, setIsConfirmExitDialogOpen] = useState(false);

  const router = useRouter();
  const { getColor } = useSuperFocus();
  let themeColor = getColor();

  const colorClass = getColorClass(themeColor);
  const borderClass = getBorderClass(themeColor);
  const bgColorClass = getBgColorClass(themeColor);

  const onCloseConfirmExitDialog = () => {
    setIsConfirmExitDialogOpen(false);
  };

  const onConfirmExit = () => {
    router.push("/dashboard");
  };

  const getHeadingText = () => {
    if (activeTab == "superFocus") {
      return "PomoSuperFocus";
    } else if (activeTab == "tasks") {
      return "PomoSuperTasks";
    } else if (activeTab == "howTo") {
      return "How to use?";
    } else {
      return "Settings";
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-[70%] m-auto mb-5">
        <div className={cn(`text-3xl font-bold flex-1 ${colorClass}`)}>
          {getHeadingText()}
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={cn(
              `border-2 ${borderClass}  border-solid pt-1 pb-1 pr-2 pl-2 rounded-md cursor-pointer `
            )}
            onClick={() => setIsConfirmExitDialogOpen(true)}
          >
            <IconHome size={22} className={colorClass} />
          </div>

          <div
            className={cn(
              `border-2 ${borderClass} ${
                activeTab == "superFocus" && bgColorClass
              }  border-solid pt-1 pb-1 pr-2 pl-2 rounded-md cursor-pointer `
            )}
            onClick={() => setActiveTab("superFocus")}
          >
            <IconFocus2
              size={22}
              className={activeTab !== "superFocus" ? colorClass : ""}
            />
          </div>
          <div
            className={cn(
              `border-2 ${borderClass} ${
                activeTab == "howTo" && bgColorClass
              } border-solid pt-1 pb-1 pr-2 pl-2 rounded-md cursor-pointer `
            )}
            onClick={() => setActiveTab("howTo")}
          >
            <IconBulb
              size={22}
              className={activeTab !== "howTo" ? colorClass : ""}
            />
          </div>
          <div
            className={cn(
              `border-2 ${borderClass} ${
                activeTab == "tasks" && bgColorClass
              } border-solid pt-1 pb-1 pr-2 pl-2 rounded-md cursor-pointer `
            )}
            onClick={() => setActiveTab("tasks")}
          >
            <IconChecklist
              size={22}
              className={activeTab !== "tasks" ? colorClass : ""}
            />
          </div>
          <div
            className={cn(
              `border-2 ${borderClass} ${
                activeTab == "settings" && bgColorClass
              } border-solid pt-1 pb-1 pr-2 pl-2 rounded-md cursor-pointer`
            )}
            onClick={() => setActiveTab("settings")}
          >
            <IconSettings
              size={22}
              className={activeTab !== "settings" ? colorClass : ""}
            />
          </div>
        </div>
      </div>
      <Separator className="w-[70%] m-auto mb-5" />

      <ReusableDialog
        isOpen={isConfirmExitDialogOpen}
        onClose={onCloseConfirmExitDialog}
        onConfirm={onConfirmExit}
        isProcessing={false}
        title="Confirm Exit?"
        description={`You are about to exit the super focus screen, are you sure? We hope you had some healthy deep work sessions and would love to see you back!`}
        confirmText="Yes, I want to exit!"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

export default Header;
