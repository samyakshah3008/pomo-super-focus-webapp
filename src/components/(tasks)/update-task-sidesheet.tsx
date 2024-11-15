"use client";

import { taskCategories } from "@/app/tasks/constants";
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
import { updateItemToUserTaskListService } from "@/services/tasks/tasks";
import { Loader } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
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
import { CalendarForm } from "./calendar";

const UpdateTaskSidesheet = ({
  taskObj,
  open,
  onOpenChange,
  setSelectedTaskObj,
  fetchTaskItems,
}: any) => {
  const [date, setDate] = useState<any>(new Date());
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const updateItemToUserTask = async () => {
    setLoading(true);
    let formattedDate = moment(date).format("DD-MM-YYYY");

    try {
      await updateItemToUserTaskListService(
        taskObj,
        formattedDate,
        taskObj?._id
      );
      fetchTaskItems();
      toast({
        variant: "default",
        title: "Item updated to Task List ✅",
        description:
          "Yay! We have successfully updated your item in the task list!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to update your item in the task list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience as we work on it!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let formatDate = moment(taskObj?.dueDate, "DD-MM-YYYY").toISOString();
    setDate(formatDate);
  }, [taskObj?.dueDate]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            Update Task
          </SheetTitle>
          <SheetDescription>
            Feel free to update your task details!
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">Title of your Task</div>
            <Input
              value={taskObj?.title}
              onChange={(e: any) =>
                setSelectedTaskObj({ ...taskObj, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">
              Want to update actions required to complete this task?
            </div>

            <Textarea
              value={taskObj?.description}
              onChange={(e: any) =>
                setSelectedTaskObj({
                  ...taskObj,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">
              Want to update the deadline for your task?
            </div>

            <CalendarForm date={date} setDate={setDate} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-black">
              Change the priority for your task?
            </div>
            <Select
              value={taskObj?.priority}
              onValueChange={(value) => {
                setSelectedTaskObj({ ...taskObj, priority: value });
              }}
            >
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Task Priorities</SelectLabel>
                  {taskCategories.map((category) => (
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
              checked={taskObj?.isCompleted ? true : false}
              onCheckedChange={() =>
                setSelectedTaskObj({
                  ...taskObj,
                  isCompleted: taskObj?.isCompleted ? false : true,
                })
              }
            />
            <Label htmlFor="item-completed" className="text-sm">
              I have completed this task! 🥳
            </Label>
          </div>
        </div>
        <SheetFooter className="flex-1 items-end">
          <SheetClose asChild>
            <Button
              disabled={
                loading ||
                !taskObj?.title?.length ||
                !taskObj?.description?.length ||
                !taskObj?.priority?.length
              }
              onClick={updateItemToUserTask}
              className="w-full"
            >
              {loading ? (
                <Loader className="mr-2 h-8 w-8 animate-spin" />
              ) : null}
              {loading ? "Updating your task..." : "Update Task!"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateTaskSidesheet;
