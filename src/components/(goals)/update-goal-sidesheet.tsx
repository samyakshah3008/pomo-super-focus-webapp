"use client";

import { goalCategories } from "@/app/goals/constants";
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
import { updateItemToUserGoalService } from "@/services/goals/goal";
import { Loader } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { CalendarForm } from "../common/calendar";
import { Checkbox } from "../ui/primitives/checkbox";
import { Input } from "../ui/primitives/input";
import { Label } from "../ui/primitives/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/primitives/select";
import { Textarea } from "../ui/primitives/textarea";
import { useToast } from "../ui/primitives/use-toast";

const UpdateGoalSidesheet = ({
  goalObj,
  open,
  onOpenChange,
  setSelectedGoalObj,
  fetchGoalItems,
}: any) => {
  const [date, setDate] = useState<any>(new Date());
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const updateItemToUserGoal = async () => {
    setLoading(true);
    let formattedDate = moment(date).format("DD-MM-YYYY");

    try {
      await updateItemToUserGoalService(goalObj, formattedDate, goalObj?._id);
      fetchGoalItems();
      toast({
        variant: "default",
        title: "Item updated to Goal List ✅",
        description:
          "Yay! we have successfully updated your new item to your goal list!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to update your item to goal list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let formatDate = moment(
      goalObj?.estimatedTimeToComplete,
      "DD-MM-YYYY"
    ).toISOString();
    setDate(formatDate);
  }, [goalObj?.estimatedTimeToComplete]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            Update Goal
          </SheetTitle>
          <SheetDescription>
            Feel free to update your goal details!
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">Title of your Goal</div>
            <Input
              value={goalObj?.title}
              onChange={(e: any) =>
                setSelectedGoalObj({ ...goalObj, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">
              Wanna update do-able actions which you will take to complete this
              goal?
            </div>

            <Textarea
              value={goalObj?.doAbleActions}
              onChange={(e: any) =>
                setSelectedGoalObj({
                  ...goalObj,
                  doAbleActions: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">
              Wanna update measurable deadline for your goal?
            </div>

            <CalendarForm date={date} setDate={setDate} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">
              Wanna change category for your goal?
            </div>
            <Select
              value={goalObj?.category}
              onValueChange={(value) => {
                setSelectedGoalObj({ ...goalObj, category: value });
              }}
            >
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Goal Categories</SelectLabel>
                  {goalCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-1 items-center">
            <Checkbox
              id="item-completed"
              checked={goalObj?.status ? true : false}
              onCheckedChange={() =>
                setSelectedGoalObj({
                  ...goalObj,
                  status: goalObj?.status ? false : true,
                })
              }
            />
            <Label htmlFor="item-completed" className="text-sm">
              I have completed this!! 🥳
            </Label>
          </div>
        </div>
        <SheetFooter className="flex-1 items-end">
          <SheetClose asChild>
            <Button
              disabled={
                loading ||
                !goalObj?.title?.length ||
                !goalObj?.doAbleActions?.length ||
                !goalObj?.category?.length
              }
              onClick={updateItemToUserGoal}
              className="w-full"
            >
              {loading ? (
                <Loader className="mr-2 h-8 w-8 animate-spin" />
              ) : null}
              {loading ? "Updating your goal..." : "Update goal!"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateGoalSidesheet;
