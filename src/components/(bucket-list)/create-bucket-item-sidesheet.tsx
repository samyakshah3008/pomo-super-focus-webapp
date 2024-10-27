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
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { addNewItemToUserBucketService } from "@/services/bucket-list/bucket-list";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/primitives/checkbox";
import { Input } from "../ui/primitives/input";
import { Label } from "../ui/primitives/label";
import { Textarea } from "../ui/primitives/textarea";
import { useToast } from "../ui/primitives/use-toast";

type BucketSidesheetProps = {
  children: React.ReactNode;
  fetchBucketItems: any;
};

type BucketItem = {
  title: string;
  description: string;
  isCompleted: boolean;
};

const CreateBucketItemSidesheet = ({
  children,
  fetchBucketItems,
}: BucketSidesheetProps) => {
  const [itemObj, setItemObj] = useState<BucketItem>({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onOpenChangeHandler = () => {
    setItemObj({
      title: "",
      description: "",
      isCompleted: false,
    });
    setLoading(false);
  };

  const addNewItemToUserBucket = async () => {
    setLoading(true);

    try {
      await addNewItemToUserBucketService(itemObj);
      toast({
        variant: "default",
        title: "Item added to Bucket List ✅",
        description:
          "Yay! we have successfully added your new item to your bucket list!",
      });
      fetchBucketItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to add your item to bucket list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sheet onOpenChange={onOpenChangeHandler}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Add New Item!
            </SheetTitle>
            <SheetDescription>
              Bucket list has no limits;) add it as many as you want!
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Title</div>
              <Input
                value={itemObj.title}
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
                value={itemObj.description}
                onChange={(e: any) =>
                  setItemObj({ ...itemObj, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-1 items-center">
              <Checkbox
                id="item-completed"
                checked={itemObj.isCompleted}
                onCheckedChange={() =>
                  setItemObj({ ...itemObj, isCompleted: !itemObj.isCompleted })
                }
              />
              <Label htmlFor="item-completed" className="text-sm">
                Yay! I have completed this off!! 🥳
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
                onClick={addNewItemToUserBucket}
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Adding your item..." : "Add Item!"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateBucketItemSidesheet;
