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
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { addNewItemToUserGoalService } from "@/services/goals/goal";
import { Loader } from "lucide-react";
import moment from "moment";
import { useState } from "react";
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

type GoalsSidesheetProps = {
  children: React.ReactNode;
  fetchGoalItems: any;
};

type GoalObj = {
  title: string;
  doAbleActions: string;
  category: string;
  status: boolean;
};

const CreateGoalSidesheet = ({
  children,
  fetchGoalItems,
}: GoalsSidesheetProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [goalObj, setGoalObj] = useState<GoalObj>({
    title: "",
    doAbleActions: "",
    category: "",
    status: false,
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onOpenChangeHandler = () => {
    setGoalObj({
      title: "",
      doAbleActions: "",
      category: "",
      status: false,
    });
    setDate(new Date());
    setLoading(false);
  };

  const addNewItemToUserGoals = async () => {
    setLoading(true);
    let formattedDate = moment(date).format("DD-MM-YYYY");

    try {
      await addNewItemToUserGoalService(goalObj, formattedDate);
      toast({
        variant: "default",
        title: "Item added to Goals List ✅",
        description:
          "Yay! we have successfully added your new item to your goal list!",
      });
      fetchGoalItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to add your item to goal list! ⚠️",
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
              Create Goal
            </SheetTitle>
            <SheetDescription>
              We recommend to divide your big goal in chunks and create a small
              do-able goal which you can achieve it in measurable time.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Give title of your Goal</div>
              <Input
                value={goalObj.title}
                onChange={(e: any) =>
                  setGoalObj({ ...goalObj, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Write down do-able actions which you will take to complete this
                goal.
              </div>

              <Textarea
                value={goalObj.doAbleActions}
                onChange={(e: any) =>
                  setGoalObj({ ...goalObj, doAbleActions: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Set a measurable deadline for your goal.
              </div>

              <CalendarForm date={date} setDate={setDate} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Set a category for your goal.
              </div>
              <Select
                value={goalObj.category}
                onValueChange={(value) => {
                  setGoalObj({ ...goalObj, category: value });
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
                checked={goalObj.status}
                onCheckedChange={() =>
                  setGoalObj({ ...goalObj, status: !goalObj.status })
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
                onClick={addNewItemToUserGoals}
                disabled={
                  loading ||
                  !goalObj?.title?.length ||
                  !goalObj?.doAbleActions?.length ||
                  !goalObj?.category?.length
                }
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Launching your goal..." : "Launch goal!"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateGoalSidesheet;
