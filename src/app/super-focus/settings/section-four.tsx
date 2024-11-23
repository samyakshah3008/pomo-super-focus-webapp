"use client";

import { Button } from "@/components/ui/primitives/button";
import { IconEdit } from "@tabler/icons-react";

const SectionFour = ({
  isUIOptionsEditing,
  setIsUIOptionsEditing,
  saveSettings,
  isGuestUser,
}: any) => {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="text-xl underline">Theme Options:</h1>
        {isUIOptionsEditing ? (
          <div>
            {" "}
            <Button onClick={() => setIsUIOptionsEditing(false)} size="sm">
              Cancel
            </Button>{" "}
            <Button
              onClick={() => saveSettings(4)}
              size="sm"
              variant="destructive"
            >
              Save
            </Button>{" "}
          </div>
        ) : (
          <IconEdit
            cursor="pointer"
            onClick={() => {
              if (!isGuestUser) {
                setIsUIOptionsEditing(true);
              }
            }}
            size={24}
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Choose the theme of Pomodoro!</div>
          <div className="text-slate-500 text-sm">
            Pick your favorite theme!
          </div>
          {/* <div className="flex gap-2">
            <div className="text-sm">Try our few options:</div>
            <div className="underline text-sm cursor-pointer">Winter</div>
            <div className="underline text-sm cursor-pointer">Physics Wallah</div>
            <div className="underline text-sm cursor-pointer">Physics Wallah</div>
          </div> */}
        </div>
        <div className="text-sm">Activated: Babuchak Jethiya! 💀</div>
      </div>
    </div>
  );
};

export default SectionFour;
