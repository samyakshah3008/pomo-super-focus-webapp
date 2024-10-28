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
import { Separator } from "../ui/primitives/separator";

const ViewGratitudeItemSidesheet = ({
  itemObj,
  open,
  onOpenChangeViewItemSidesheet,
}: any) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChangeViewItemSidesheet}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              View Gratitude
            </SheetTitle>
            <SheetDescription>
              Spend time to review your gratitude!
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Gratitude's Title:
              </div>
              <div className="text-sm text-black">{itemObj?.title}</div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Description of gratitude:
              </div>
              <div className="text-sm text-black">{itemObj?.description}</div>
            </div>
            <Separator />

            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-black">
                Date of creation:
              </div>
              <div className="text-sm text-black">
                {itemObj?.dateOfCreation}
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

export default ViewGratitudeItemSidesheet;
