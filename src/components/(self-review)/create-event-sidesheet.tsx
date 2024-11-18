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
import { addNewItemToUserSelfReviewService } from "@/services/self-review/self-review";
import { Loader } from "lucide-react";
import { useState } from "react";
import { CalendarForm } from "../common/calendar";
import { Input } from "../ui/primitives/input";
import { Textarea } from "../ui/primitives/textarea";
import { useToast } from "../ui/primitives/use-toast";

type GoalsSidesheetProps = {
  children: React.ReactNode;
  fetchSelfReviewItems: any;
};

type SelfReviewObj = {
  title: string;
  description: string;
};

const CreateSelfReviewEventSidesheet = ({
  children,
  fetchSelfReviewItems,
}: GoalsSidesheetProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selfReviewItemObj, setSelfReviewItemObj] = useState<SelfReviewObj>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onOpenChangeHandler = () => {
    setSelfReviewItemObj({
      title: "",
      description: "",
    });
    setDate(new Date());
    setLoading(false);
  };

  const addNewItemToUserSelfReviewList = async () => {
    setLoading(true);

    try {
      await addNewItemToUserSelfReviewService(selfReviewItemObj, date);
      toast({
        variant: "default",
        title: "New life event added to Self review List ✅",
        description:
          "Yay! we have successfully added your new event to your self review list!",
      });
      fetchSelfReviewItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to add your item to self review list! ⚠️",
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
              Create Life Event
            </SheetTitle>
            <SheetDescription>
              Capture events of year and come back to review it to know how far
              you have reached! No matter you failed, capture it;)
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Give title of your Event</div>
              <Input
                value={selfReviewItemObj.title}
                onChange={(e: any) =>
                  setSelfReviewItemObj({
                    ...selfReviewItemObj,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Describe your life event in detail and make sure to write the
                pattern you followed which worked or didn't worked so that you
                can continue or change!
              </div>

              <Textarea
                value={selfReviewItemObj.description}
                onChange={(e: any) =>
                  setSelfReviewItemObj({
                    ...selfReviewItemObj,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                When did this life event happened?
              </div>

              <CalendarForm
                date={date}
                setDate={setDate}
                shouldDisableFutureDates={true}
              />
            </div>
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button
                onClick={addNewItemToUserSelfReviewList}
                disabled={
                  loading ||
                  !selfReviewItemObj?.title?.length ||
                  !selfReviewItemObj?.description?.length
                }
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Creating an event..." : "Create event!"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateSelfReviewEventSidesheet;
