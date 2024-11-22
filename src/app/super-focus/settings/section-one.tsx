"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { IconEdit } from "@tabler/icons-react";

const SectionOne = ({
  isTimeSectionEditing,
  setIsTimeSectionEditing,
  saveSettings,
  superFocusDetails,
  setSuperFocusDetails,
  onCancelEdit,
  isGuestUser,
}: any) => {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="text-xl underline">Time(Minutes):</h1>
        {isTimeSectionEditing ? (
          <div>
            {" "}
            <Button onClick={() => onCancelEdit(1)} size="sm">
              Cancel
            </Button>{" "}
            <Button
              onClick={() => saveSettings(1)}
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
                setIsTimeSectionEditing(true);
              }
            }}
            size={24}
          />
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-4 flex-1">
          Study:{" "}
          <Input
            className=""
            disabled={!isTimeSectionEditing}
            value={superFocusDetails?.time?.studyTime}
            onChange={(e: any) =>
              setSuperFocusDetails({
                ...superFocusDetails,
                time: {
                  ...superFocusDetails?.time,
                  studyTime: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          Short break:{" "}
          <Input
            className=""
            onChange={(e: any) =>
              setSuperFocusDetails({
                ...superFocusDetails,
                time: {
                  ...superFocusDetails?.time,
                  shortBreak: e.target.value,
                },
              })
            }
            value={superFocusDetails?.time?.shortBreak}
            disabled={!isTimeSectionEditing}
          />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          Long break:{" "}
          <Input
            className=""
            value={superFocusDetails?.time?.longBreak}
            disabled={!isTimeSectionEditing}
            onChange={(e: any) =>
              setSuperFocusDetails({
                ...superFocusDetails,
                time: {
                  ...superFocusDetails?.time,
                  longBreak: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
