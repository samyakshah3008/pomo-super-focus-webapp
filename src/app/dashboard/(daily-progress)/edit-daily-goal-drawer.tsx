"use client";

import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/primitives/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/primitives/drawer";
import { useEffect, useState } from "react";
import ConfirmUpdateGoalDialog from "./confirm-update-goal-dialog";
import { dailyGoalOptions, sampleDailyGoalBarGraphData } from "./constants";

type EditDailyGoalDialogProps = {
  isEditGoalDrawerOpen: boolean;
  onCloseDrawer: () => void;
  currentDailyGoal: Number;
};

const EditGoalDrawer = ({
  isEditGoalDrawerOpen,
  onCloseDrawer,
  currentDailyGoal,
}: EditDailyGoalDialogProps) => {
  const findCurrentDailyGoalItemIndex = dailyGoalOptions.findIndex(
    (item) => item.hour == currentDailyGoal
  );

  const [dailyGoalInHours, setDailyGoalInHours] = useState<any>(
    currentDailyGoal || 0.5
  );
  const [selectedDailyGoalOptionIndex, setSelectedDailyGoalOptionIndex] =
    useState<any>(findCurrentDailyGoalItemIndex || dailyGoalOptions[0]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const onIncrease = () => {
    const nextIndex = selectedDailyGoalOptionIndex + 1;
    setSelectedDailyGoalOptionIndex(nextIndex);
    const findNextOption = dailyGoalOptions.find(
      (_, index) => index == nextIndex
    );
    setDailyGoalInHours(findNextOption?.hour);
  };

  const onDecrease = () => {
    const prevIndex = selectedDailyGoalOptionIndex - 1;
    setSelectedDailyGoalOptionIndex(prevIndex);
    const findPrevOption = dailyGoalOptions.find(
      (_, index) => index == prevIndex
    );
    setDailyGoalInHours(findPrevOption?.hour);
  };

  const onSubmit = () => {
    onCloseDrawer();
    setShowConfirmDialog(true);
  };

  const prefillValue = () => {
    setSelectedDailyGoalOptionIndex(findCurrentDailyGoalItemIndex);
    setDailyGoalInHours(currentDailyGoal);
  };

  useEffect(() => {
    if (!isEditGoalDrawerOpen) return;
    prefillValue();
  }, [isEditGoalDrawerOpen]);

  if (!currentDailyGoal) return;

  return (
    <>
      <Drawer open={isEditGoalDrawerOpen}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Deep work Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily deep work sessions goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={onDecrease}
                  disabled={dailyGoalInHours <= 0.5}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {dailyGoalInHours}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    {dailyGoalInHours < 1.5 ? "Hour/day" : "Hours/day"}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={onIncrease}
                  disabled={dailyGoalInHours >= 12}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleDailyGoalBarGraphData}>
                    <Bar
                      dataKey="goal"
                      style={
                        {
                          fill: "hsl(var(--foreground))",
                          opacity: 0.9,
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={onSubmit}>Submit</Button>
              <DrawerClose asChild>
                <Button onClick={onCloseDrawer} variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <ConfirmUpdateGoalDialog
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        newDailyGoalFocusTimeValue={dailyGoalInHours}
      />
    </>
  );
};

export default EditGoalDrawer;
