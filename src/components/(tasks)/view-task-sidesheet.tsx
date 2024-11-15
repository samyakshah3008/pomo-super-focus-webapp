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

const ViewTaskSidesheet = ({
  taskObj,
  open,
  onOpenChangeViewTaskSidesheet,
}: any) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChangeViewTaskSidesheet}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              View Task
            </SheetTitle>
            <SheetDescription>Spend time to review your task!</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">My Task:</div>
              <div className="text-sm text-black">{taskObj?.title}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                My actionable steps to complete this task:
              </div>
              <div className="text-sm text-black">{taskObj?.description}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Estimated time to complete this task:
              </div>

              <div className="text-sm text-black">{taskObj?.dueDate}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Task category
              </div>
              <div className="text-sm text-black">{taskObj?.priority}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Have I completed this task?
              </div>
              <div className="text-sm text-black">
                {taskObj?.isCompleted == false
                  ? "Working towards completing it on time! 🏆"
                  : "Task completed! I’m proud of my progress! 😻✅"}
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

export default ViewTaskSidesheet;
