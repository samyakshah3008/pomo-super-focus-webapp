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
import { addNewItemToUserGratitudeService } from "@/services/gratitude-list/gratitude-list";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/primitives/input";
import { Textarea } from "../ui/primitives/textarea";
import { useToast } from "../ui/primitives/use-toast";

type CreateGratitudeSidesheetProps = {
  children: React.ReactNode;
  fetchGratitudeItems: any;
  isGuestUser: boolean;
};

type GratitudeItem = {
  title: string;
  description: string;
};

const CreateGratitudeSidesheet = ({
  children,
  fetchGratitudeItems,
  isGuestUser,
}: CreateGratitudeSidesheetProps) => {
  const [itemObj, setItemObj] = useState<GratitudeItem>({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onOpenChangeHandler = () => {
    setItemObj({
      title: "",
      description: "",
    });
    setLoading(false);
  };

  const addNewItemToUserGratitude = async () => {
    if (isGuestUser) {
      toast({
        variant: "destructive",
        title: "Guest users don't have creds for now! 😄",
        description:
          "However, we promise to give you a verified account access to the soonest!",
      });
    } else {
      setLoading(true);

      try {
        await addNewItemToUserGratitudeService(itemObj);
        toast({
          variant: "default",
          title: "Item added to Gratitude List ✅",
          description:
            "Yay! we have successfully added your new item to your gratitude list!",
        });
        fetchGratitudeItems();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, failed to add your item to gratitude list! ⚠️",
          description:
            "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Sheet onOpenChange={onOpenChangeHandler}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Add New Gratitude!
            </SheetTitle>
            <SheetDescription>
              Gratitude list has no limits;) add it as many as you want!
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
              <div className="text-sm text-black">Describe your gratitude!</div>

              <Textarea
                value={itemObj.description}
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
                onClick={addNewItemToUserGratitude}
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Adding your gratitude.." : "Add Gratitude!"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateGratitudeSidesheet;
