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
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { addNewItemToUserTaskListService } from "@/services/tasks/tasks";
import { Loader } from "lucide-react";
import moment from "moment";
import { useState } from "react";
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

type TasksSidesheetProps = {
  children: React.ReactNode;
  fetchTaskItems: any;
};

type TaskObj = {
  title: string;
  description: string;
  priority: string;
  isCompleted: boolean;
};

const CreateTaskSidesheet = ({
  children,
  fetchTaskItems,
}: TasksSidesheetProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [taskObj, setTaskObj] = useState<TaskObj>({
    title: "",
    description: "",
    priority: "",
    isCompleted: false,
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onOpenChangeHandler = () => {
    setTaskObj({
      title: "",
      description: "",
      priority: "",
      isCompleted: false,
    });
    setDate(new Date());
    setLoading(false);
  };

  const addNewItemToUserTasks = async () => {
    setLoading(true);
    let formattedDate = moment(date).format("DD-MM-YYYY");

    try {
      await addNewItemToUserTaskListService(taskObj, formattedDate);
      toast({
        variant: "default",
        title: "Item added to Task List ✅",
        description:
          "Yay! we have successfully added your new item to your task list!",
      });
      fetchTaskItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to add your item to task list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience while we fix it!",
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
              Create Task
            </SheetTitle>
            <SheetDescription>
              Break down your big tasks into small, actionable steps you can
              complete in measurable time.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Enter the title of your Task
              </div>
              <Input
                value={taskObj.title}
                onChange={(e: any) =>
                  setTaskObj({ ...taskObj, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Write down actions you will take to complete this task.
              </div>

              <Textarea
                value={taskObj.description}
                onChange={(e: any) =>
                  setTaskObj({ ...taskObj, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Set a deadline for your task.
              </div>

              <CalendarForm date={date} setDate={setDate} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Decide a priority of your task.
              </div>
              <Select
                value={taskObj.priority}
                onValueChange={(value) => {
                  setTaskObj({ ...taskObj, priority: value });
                }}
              >
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Task Categories</SelectLabel>
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
                checked={taskObj.isCompleted}
                onCheckedChange={() =>
                  setTaskObj({ ...taskObj, isCompleted: !taskObj.isCompleted })
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
                onClick={addNewItemToUserTasks}
                disabled={
                  loading ||
                  !taskObj?.title?.length ||
                  !taskObj?.description?.length ||
                  !taskObj?.priority?.length
                }
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Adding your task..." : "Add Task"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateTaskSidesheet;
