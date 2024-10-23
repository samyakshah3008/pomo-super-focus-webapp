"use client";

import { goalCategories } from "@/app/goals/constants";
import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/primitives/sheet";
import { useState } from "react";
import ReusableDialog from "../common/reusable-dialog";
import { Checkbox } from "../ui/primitives/checkbox";
import { Input } from "../ui/primitives/input";
import { Label } from "../ui/primitives/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/primitives/select";
import { Textarea } from "../ui/primitives/textarea";
import { CalendarForm } from "./calendar";

type GoalObj = {
  title: string;
  actions: string;
  category: string;
  isAchieved: boolean;
};

const UpdateGoalSidesheet = ({
  children,
  goalObj,
  open,
  onOpenChange,
  setSelectedGoalObj,
}: any) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showConfirmUpdateGoalDialog, setShowConfirmUpdateGoalDialog] =
    useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const onCloseConfirmUpdateGoalDialog = () => {
    setShowConfirmUpdateGoalDialog(false);
  };

  const onConfirmUpdate = () => {};

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Update Goal
            </SheetTitle>
            <SheetDescription>
              Feel free to update your goal details!
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Title of your Goal</div>
              <Input
                value={goalObj?.goals}
                onChange={(e: any) =>
                  setSelectedGoalObj({ ...goalObj, goals: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Wanna update do-able actions which you will take to complete
                this goal?
              </div>

              <Textarea
                value={goalObj?.steps}
                onChange={(e: any) =>
                  setSelectedGoalObj({ ...goalObj, steps: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Wanna update measurable deadline for your goal?
              </div>

              <CalendarForm date={date} setDate={setDate} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Wanna change category for your goal?
              </div>
              <Select>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Goal Categories</SelectLabel>
                    {goalCategories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        onChange={() =>
                          setSelectedGoalObj({
                            ...goalObj,
                            category: category.value,
                          })
                        }
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-1 items-center">
              <Checkbox
                id="item-completed"
                checked={goalObj?.status == "achieved" ? true : false}
                onCheckedChange={() =>
                  setSelectedGoalObj({
                    ...goalObj,
                    status:
                      goalObj?.status == "achieved"
                        ? "yet to achieve"
                        : "achieved",
                  })
                }
              />
              <Label htmlFor="item-completed" className="text-sm">
                I have completed this!! 🥳
              </Label>
            </div>
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button
                onClick={() => setShowConfirmUpdateGoalDialog(true)}
                className="w-full"
              >
                Update
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <ReusableDialog
        isOpen={showConfirmUpdateGoalDialog}
        onClose={onCloseConfirmUpdateGoalDialog}
        onConfirm={onConfirmUpdate}
        isProcessing={isUpdating}
        title="Confirm Update?"
        description={`You are about to update this goal. Please confirm!`}
        confirmText="Yes, I want to update!"
        cancelText="I'll update later"
        variant="destructive"
      />
    </>
  );
};

export default UpdateGoalSidesheet;
