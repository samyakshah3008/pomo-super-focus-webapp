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
import {
  deleteItemFromUserSelfReviewService,
  updateItemToUserSelfReviewService,
} from "@/services/self-review/self-review";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarForm } from "../common/calendar";
import ReusableDialog from "../common/reusable-dialog";
import { Input } from "../ui/primitives/input";
import { Textarea } from "../ui/primitives/textarea";
import { useToast } from "../ui/primitives/use-toast";

const UpdateSelfReviewEventItemSidesheet = ({
  itemObj,
  open,
  onOpenChange,
  setSelectedItemObj,
  fetchSelfReviewItems,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const updateItemToUserSelfReviewList = async () => {
    setLoading(true);

    try {
      await updateItemToUserSelfReviewService(itemObj, date, itemObj?._id);
      fetchSelfReviewItems();
      toast({
        variant: "default",
        title: "Item updated to Self review List ✅",
        description: "Yay! we have successfully updated your self review item!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to update your item to self review list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onCloseConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(false);
  };

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemFromUserSelfReviewService(itemObj?._id);
      toast({
        variant: "default",
        title: "Item deleted from your Self Review List ✅",
        description:
          "Yay! we have successfully deleted your item from your self review list!",
      });
      fetchSelfReviewItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to delete your item from self review list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setIsDeleting(false);
      setIsConfirmDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    setDate(itemObj?.date);
  }, [itemObj?.date]);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Update Event!
            </SheetTitle>
            <SheetDescription>
              Thinking to update your self review event? Feel free to do so;)
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Give title of your Event</div>
              <Input
                value={itemObj?.title}
                onChange={(e: any) =>
                  setSelectedItemObj({ ...itemObj, title: e.target.value })
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
                value={itemObj?.description}
                onChange={(e: any) =>
                  setSelectedItemObj({
                    ...itemObj,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Wanna update measurable deadline for your goal?
              </div>

              <CalendarForm
                date={date}
                setDate={setDate}
                shouldDisableFutureDates={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Want to delete this Event?
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="w-fit"
                onClick={() => {
                  setIsConfirmDeleteDialogOpen(true);
                  onOpenChange();
                }}
              >
                Delete this event!
              </Button>
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
                onClick={updateItemToUserSelfReviewList}
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Updating your event..." : "Update Event!"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <ReusableDialog
        isOpen={isConfirmDeleteDialogOpen}
        onClose={onCloseConfirmDeleteDialog}
        onConfirm={onConfirmDelete}
        isProcessing={isDeleting}
        title="Confirm Delete?"
        description={`You are about to delete this event. This action is irreversible. Are you sure you want to delete it?`}
        confirmText="Yes, I want to delete!"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

export default UpdateSelfReviewEventItemSidesheet;
