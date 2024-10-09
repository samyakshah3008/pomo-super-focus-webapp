"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/primitives/popover";
import { deleteRequest } from "@/config/API";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { UpdateHabitDialog } from "./update-habit-dialog";

const PopoverHabitActions = ({
  habit,
  fetchHabits,
  markHabitComplete,
}: any) => {
  const [showUpdateHabitDialog, setShowUpdateHabitDialog] =
    useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const onCloseUpdateHabitDialog = () => {
    setShowUpdateHabitDialog(false);
  };

  const deleteHabit = async () => {
    try {
      await deleteRequest(`/habits/${habit?._id}`);
      fetchHabits();
      setPopoverOpen(false);
    } catch (error) {
      console.log(error, "error deleting habit");
    }
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <IconDotsVertical size={20} cursor="pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <div className="flex flex-col p-2">
            <div
              onClick={() => setShowUpdateHabitDialog(true)}
              className="text-sm cursor-pointer p-2 hover:bg-slate-100 hover:rounded-md "
            >
              Update
            </div>
            <div
              onClick={() => deleteHabit()}
              className="text-sm cursor-pointer p-2 hover:bg-slate-100 hover:rounded-md"
            >
              Delete
            </div>
            <div
              onClick={() => markHabitComplete(habit?._id, true)}
              className="text-sm cursor-pointer p-2 hover:bg-slate-100 hover:rounded-md"
            >
              Mark as complete
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <UpdateHabitDialog
        isUpdateHabitDialogOpen={showUpdateHabitDialog}
        onCloseUpdateHabitDialog={onCloseUpdateHabitDialog}
        habit={habit}
        fetchHabits={fetchHabits}
      />
    </>
  );
};

export default PopoverHabitActions;
