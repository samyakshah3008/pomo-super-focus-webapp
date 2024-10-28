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
import { updateItemToUserGratitudeService } from "@/services/gratitude-list/gratitude-list";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/primitives/input";
import { Textarea } from "../ui/primitives/textarea";
import { useToast } from "../ui/primitives/use-toast";

const UpdateGratitudeItemSidesheet = ({
  itemObj,
  open,
  onOpenChange,
  setItemObj,
  fetchGratitudeItems,
}: any) => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const updateItemToUserGratitude = async () => {
    setLoading(true);

    try {
      await updateItemToUserGratitudeService(itemObj, itemObj?._id);
      fetchGratitudeItems();
      toast({
        variant: "default",
        title: "Item updated to Gratitude List ✅",
        description:
          "Yay! We have successfully updated your item in your gratitude list!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to update your item in gratitude list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience while we fix this!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Update content!
            </SheetTitle>
            <SheetDescription>
              Thinking to update your gratitude content? Feel free to do so;)
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
              <div className="text-sm text-black">Describe your gratitude!</div>

              <Textarea
                value={itemObj?.description}
                onChange={(e: any) =>
                  setItemObj({ ...itemObj, description: e.target.value })
                }
              />
            </div>
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button
                disabled={
                  loading ||
                  !itemObj?.title?.length ||
                  !itemObj?.description?.length
                }
                onClick={updateItemToUserGratitude}
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
    </>
  );
};

export default UpdateGratitudeItemSidesheet;
