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
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { useState } from "react";
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

type GoalsSidesheetProps = {
  children: React.ReactNode;
};

type GoalObj = {
  title: string;
  actions: string;
  category: string;
  isAchieved: boolean;
};

const CreateGoalSidesheet = ({ children }: GoalsSidesheetProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [goalObj, setGoalObj] = useState<GoalObj>({
    title: "",
    actions: "",
    category: "",
    isAchieved: false,
  });

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Create Goal
            </SheetTitle>
            <SheetDescription>
              We recommend to divide your big goal in chunks and create a small
              do-able goal which you can achieve it in measurable time.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Give title of your Goal</div>
              <Input
                value={goalObj.title}
                onChange={(e: any) =>
                  setGoalObj({ ...goalObj, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Write down do-able actions which you will take to complete this
                goal.
              </div>

              <Textarea
                value={goalObj.actions}
                onChange={(e: any) =>
                  setGoalObj({ ...goalObj, actions: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Set a measurable deadline for your goal.
              </div>

              <CalendarForm date={date} setDate={setDate} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Set a category for your goal.
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
                          setGoalObj({ ...goalObj, category: category.value })
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
                checked={goalObj.isAchieved}
                onCheckedChange={() =>
                  setGoalObj({ ...goalObj, isAchieved: !goalObj.isAchieved })
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
                disabled={
                  !goalObj?.title?.length ||
                  !goalObj?.actions?.length ||
                  !goalObj?.category?.length
                }
                className="w-full"
              >
                Create
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateGoalSidesheet;
