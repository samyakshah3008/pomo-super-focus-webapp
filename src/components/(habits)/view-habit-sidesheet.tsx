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

const ViewHabitSidesheet = ({
  habitObj,
  open,
  onOpenChangeViewHabitSidesheet,
  repeat,
  selectedDays,
}: any) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChangeViewHabitSidesheet}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              View Your Habit
            </SheetTitle>
            <SheetDescription>
              Spend time to review your habit!
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Your Habit:
              </div>
              <div className="text-sm text-black">
                {habitObj?.defineHabitText}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Your specification:
              </div>
              <div className="text-sm text-black">
                {habitObj?.getSpecificText}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">Identity</div>

              <div className="text-sm text-black">{habitObj?.identityText}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Repeat frequency
              </div>
              <div className="text-sm text-black">{repeat}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">Days</div>
              <div className="flex flex-wrap gap-2 text-sm text-black">
                {selectedDays?.map((day: any) => {
                  return <div className="rounded-md border-2 p-2">{day}</div>;
                })}
              </div>
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

export default ViewHabitSidesheet;
