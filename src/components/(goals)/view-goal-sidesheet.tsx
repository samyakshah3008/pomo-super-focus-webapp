"use client";

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

type GoalObj = {
  title: string;
  actions: string;
  category: string;
  isAchieved: boolean;
};

const ViewGoalSidesheet = ({
  item,
  open,
  onOpenChangeViewGoalSidesheet,
}: any) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [goalObj, setGoalObj] = useState<GoalObj>({
    title: "",
    actions: "",
    category: "",
    isAchieved: false,
  });

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChangeViewGoalSidesheet}>
        {/* <SheetTrigger asChild>{children}</SheetTrigger> */}
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              View Goal
            </SheetTitle>
            <SheetDescription>Spend time to review your goal!</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">My Goal</div>
              <div className="text-sm text-black">{goalObj.title}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                My do-able actions which I have to take to complete it:
              </div>
              <div className="text-sm text-black">{goalObj.actions}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                My measurable deadline which I'll take to complete my goal!
              </div>

              <div className="text-sm text-black">date</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">My goal's category</div>
              <div className="text-sm text-black">{goalObj.category}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Have I achieved my goal?</div>
              <div className="text-sm text-black">{goalObj.isAchieved}</div>
            </div>
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button className="w-full">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ViewGoalSidesheet;