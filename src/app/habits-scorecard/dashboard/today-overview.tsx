"use client";

import { Button } from "@/components/ui/primitives/button";
import { patch } from "@/config/API";
import { IconCircle, IconPlus } from "@tabler/icons-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import EmptyStateCatPumpkin from "../../../../public/empty-state-cat-pumpkin.png";
import { NewHabitDialog } from "./create-new-habit-dialog";
import PopoverHabitActions from "./popover-habit-actions";

const TodayOverview = ({ habits, fetchHabits }: any) => {
  const [showNewHabitDialog, setShowNewHabitDialog] = useState<boolean>(false);

  const [currentDate, setCurrentDate] = useState(moment());

  // Navigate to the previous day
  const goToPreviousDay = () => {
    setCurrentDate(currentDate.clone().subtract(1, "days"));
  };

  // Navigate to the next day
  const goToNextDay = () => {
    setCurrentDate(currentDate.clone().add(1, "days"));
  };

  // Format the day and date dynamically
  const formattedDay = currentDate.format("dddd");
  const formattedDate = currentDate.format("Do MMMM YYYY");

  const onCloseCreateNewHabitDialog = () => {
    setShowNewHabitDialog(false);
  };

  const markHabitComplete = async (habitId: string, isComplete: boolean) => {
    try {
      await patch(`/habits/${habitId}/mark-complete`, {
        date: new Date().toISOString().split("T")[0],
        isComplete,
      });
      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="text-xl underline font-bold text-center">
        Have a look at your today's habits:
      </div>
      <div className="flex flex-col gap-10">
        <div className="p-4 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div>
                <div className="font-bold">{formattedDay}</div>
                <div className="text-sm text-gray-700">{formattedDate}</div>
              </div>

              {/* <div className="flex gap-2">
                <IconArrowLeft
                  size={20}
                  cursor="pointer"
                  onClick={goToPreviousDay}
                />
                <IconArrowRight
                  size={20}
                  cursor="pointer"
                  onClick={goToNextDay}
                />
              </div> */}
            </div>

            <Button size="sm" onClick={() => setShowNewHabitDialog(true)}>
              <div className="flex gap-2 items-center">
                <IconPlus size={20} /> New Habit
              </div>
            </Button>
          </div>
        </div>

        <div className="w-[90%] m-auto flex flex-col gap-10">
          {habits?.length !== 0 ? (
            habits?.map((habit: any, index: any) => {
              return (
                <div key={index} className="flex items-center gap-4">
                  <IconCircle size={20} cursor="pointer" />
                  <div className="flex-1 flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <div className="font-bold">{habit?.title}</div>
                      <div className="flex gap-2">
                        {habit?.categories?.map((category: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className="text-sm bg-blue-200 border-blue-500 p-1 rounded-md"
                            >
                              {category}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <PopoverHabitActions
                      habit={habit}
                      fetchHabits={fetchHabits}
                      markHabitComplete={markHabitComplete}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image
                src={EmptyStateCatPumpkin}
                width={200}
                height={200}
                alt="empty-state"
              />
              <div className="font-semibold">
                No Habits for today, Create one!
              </div>
            </div>
          )}
        </div>
      </div>
      <NewHabitDialog
        isCreateNewHabitDialogOpen={showNewHabitDialog}
        onCloseCreateNewHabitDialog={onCloseCreateNewHabitDialog}
        fetchHabits={fetchHabits}
      />
    </div>
  );
};

export default TodayOverview;
