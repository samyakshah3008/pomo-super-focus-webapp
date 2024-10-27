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
import { updateItemToUserBucketService } from "@/services/bucket-list/bucket-list";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/primitives/checkbox";
import { Input } from "../ui/primitives/input";
import { Label } from "../ui/primitives/label";
import { Textarea } from "../ui/primitives/textarea";
import { useToast } from "../ui/primitives/use-toast";

const UpdateBucketItemSidesheet = ({
  itemObj,
  open,
  onOpenChange,
  setSelectedItemObj,
  fetchBucketItems,
}: any) => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const updateItemToUserBucket = async () => {
    setLoading(true);

    try {
      await updateItemToUserBucketService(itemObj, itemObj?._id);
      fetchBucketItems();
      toast({
        variant: "default",
        title: "Item updated to Bucket List ✅",
        description:
          "Yay! we have successfully updated your new item to your bucket list!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to update your item to bucket list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
                setSelectedItemObj({ ...itemObj, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">Describe your bucket item!</div>

            <Textarea
              value={itemObj?.description}
              onChange={(e: any) =>
                setSelectedItemObj({ ...itemObj, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-1 items-center">
            <Checkbox
              id="item-completed"
              checked={itemObj?.isCompleted}
              onCheckedChange={() =>
                setSelectedItemObj({
                  ...itemObj,
                  isCompleted: !itemObj?.isCompleted,
                })
              }
            />
            <Label htmlFor="item-completed" className="text-sm">
              Yay! I checked completed this!! 🥳
            </Label>
          </div>
        </div>
        <SheetFooter className="flex-1 items-end">
          <SheetClose asChild>
            <Button
              disabled={
                loading ||
                !itemObj?.title?.length ||
                !itemObj?.description?.length ||
                typeof itemObj?.isCompleted != "boolean"
              }
              onClick={updateItemToUserBucket}
              className="w-full"
            >
              {loading ? (
                <Loader className="mr-2 h-8 w-8 animate-spin" />
              ) : null}
              {loading ? "Updating your item..." : "Update Item!"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateBucketItemSidesheet;
