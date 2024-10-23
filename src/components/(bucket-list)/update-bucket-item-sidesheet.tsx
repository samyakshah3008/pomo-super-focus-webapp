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
import { Checkbox } from "../ui/primitives/checkbox";
import { Input } from "../ui/primitives/input";
import { Label } from "../ui/primitives/label";
import { Textarea } from "../ui/primitives/textarea";

const UpdateBucketItemSidesheet = ({
  itemObj,
  open,
  onOpenChange,
  setItemObj,
}: any) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Update Item!
            </SheetTitle>
            <SheetDescription>
              Thinking to update your bucket item? Feel free to do so;)
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Title</div>
              <Input
                value={itemObj?.title}
                onChange={(e: any) =>
                  setItemObj({ ...itemObj, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Describe your bucket item!
              </div>

              <Textarea
                value={itemObj?.description}
                onChange={(e: any) =>
                  setItemObj({ ...itemObj, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-1 items-center">
              <Checkbox
                id="item-completed"
                checked={itemObj?.isCompleted}
                onCheckedChange={() =>
                  setItemObj({ ...itemObj, isCompleted: !itemObj?.isCompleted })
                }
              />
              <Label htmlFor="item-completed" className="text-sm">
                Yay! I checked completed this!! 🥳
              </Label>
            </div>
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button className="w-full">Update Item!</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UpdateBucketItemSidesheet;
